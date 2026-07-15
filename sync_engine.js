/**
 * Prabandha Sync Engine
 * Handles systemic cache-busting and asset hot-swapping transparently
 */
(function () {
    const ASSET_MANIFEST_KEY = 'app_cached_asset_hashes';

    async function executeSyncCheck() {
        // Retrieve last cached state
        let cachedHashes = {};
        try {
            cachedHashes = JSON.parse(localStorage.getItem(ASSET_MANIFEST_KEY)) || {};
        } catch (e) {
            console.error("[Sync Engine] Cache read failure, resetting state token.");
        }

        try {
            // Fetch the static manifest produced by your GitHub Actions runner
            // FORCE BYPASS: Append a dynamic microsecond timestamp to bypass edge/disk layers completely
            const cacheBusterUrl = `./sync-check.json?t=${Date.now()}`;
            
            const response = await fetch(cacheBusterUrl, { 
                cache: 'no-store', // 'no-store' is stricter than 'no-cache' and blocks disk storage entirely
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            
            if (!response.ok) throw new Error("Manifest tracking file unreachable.");

            const manifest = await response.json();
            let filesToUpdate = [];

            // Compute delta modifications between server and client
            for (const [relativePath, serverHash] of Object.entries(manifest.assets)) {
                if (cachedHashes[relativePath] !== serverHash) {
                    filesToUpdate.push({ path: relativePath, hash: serverHash });
                }
            }

            // Exit early if client matches the static tree compilation
            if (filesToUpdate.length === 0) {
                console.log("[Sync Engine] System is perfectly synchronized.");
                return;
            }

            console.log(`[Sync Engine] Updating ${filesToUpdate.length} stale assets...`);

            // Apply targeted server actions (e.g. flushing background images if needed)
            if (manifest.actions && manifest.actions.must_clear_local_storage) {
                manifest.actions.must_clear_local_storage.forEach(key => {
                    localStorage.removeItem(key);
                });
            }

            // Group scripts vs other items (audio handles update via dynamic URL resolving hooks)
            const scriptUpdates = filesToUpdate.filter(item => item.path.endsWith('.js'));

            if (scriptUpdates.length > 0) {
                await Promise.all(scriptUpdates.map(item => injectFreshScript(item.path, item.hash)));
                
                // If the language text engine is active in memory, re-compile runtime strings
                if (typeof window.mergeLanguageTexts === "function") {
                    window.mergeLanguageTexts();
                    console.log("[Sync Engine] State modifications merged successfully.");
                }
                // Re-init pasuram pickers after hot-swap (DOMContentLoaded will not re-fire)
                if (typeof window.initPasuramPickers === "function") {
                    window.initPasuramPickers();
                }
            }

            // Commit new verified signatures map back to client storage bounds
            localStorage.setItem(ASSET_MANIFEST_KEY, JSON.stringify(manifest.assets));

        } catch (err) {
            console.error("[Sync Engine] Automatic update loop aborted:", err);
        }
    }

    /**
     * Programmatically constructs and updates script references in DOM head
     */
    function injectFreshScript(relativePath, contentHash) {
        return new Promise((resolve, reject) => {
            // Find existing script nodes tracking that exact asset relative path destination
            const cleanPath = relativePath.split('?')[0];
            const oldScript = document.querySelector(`script[data-asset-path="${cleanPath}"]`) || 
                              document.querySelector(`script[src^="${cleanPath}"]`);
            if (oldScript) oldScript.remove();

            const script = document.createElement('script');
            script.src = `${relativePath}?h=${contentHash}`;
            script.setAttribute('data-asset-path', cleanPath);
            script.async = false; // Preserve structural execution order bounds

            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Fetch execution failed for resource chain: ${relativePath}`));

            document.head.appendChild(script);
        });
    }

    // Expose lookup tool globally so player engines can pull dynamic audio parameters
    window.resolveCachedAssetUrl = function (relativeAssetPath) {
        try {
            const activeHashes = JSON.parse(localStorage.getItem(ASSET_MANIFEST_KEY)) || {};
            const matchHash = activeHashes[relativeAssetPath];
            return matchHash ? `${relativeAssetPath}?h=${matchHash}` : relativeAssetPath;
        } catch(e) {
            return relativeAssetPath;
        }
    };

    // Run verification immediately upon file evaluation
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", executeSyncCheck);
    } else {
        executeSyncCheck();
    }
})();
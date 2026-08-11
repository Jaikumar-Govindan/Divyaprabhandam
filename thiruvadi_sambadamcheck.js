(function () {
    const TVM_KEY = 'TVM';
    let selectedPrabandhamForPlay = null;

    // Helper Function 1: Check for Gibberish / Keyboard Mashing
    function isGibberish(text) {
        text = text.trim().toLowerCase();

        // 1. Repeated single character (e.g., "aaaaa")
        if (/(.)\1{3,}/.test(text)) return true;

        // 2. Keyboard row patterns
        const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
        for (const row of keyboardRows) {
            if (text.length >= 5 && row.includes(text)) return true;
        }

        // 3. Vowel-to-consonant ratio check (for Latin text)
        const letters = (text.match(/[a-z]/g) || []).length;
        const vowels = (text.match(/[aeiouy]/g) || []).length;
        if (letters > 5) {
            const vowelRatio = vowels / letters;
            // Extremely low (<10%) or high (>90%) vowel ratios usually indicate gibberish
            if (vowelRatio < 0.10 || vowelRatio > 0.90) return true;
        }

        return false;
    }

    // Helper Function 2: Validate Acharya Name Title
    function isValidAcharyaName(input) {
        const text = input.trim().toLowerCase();
        
        // Minimum length check
        if (text.length < 5) return false;

        // Must contain common Acharya honorifics/keywords
        const requiredKeywords = ['sri', 'sree', 'shri', 'swami', 'swamy', 'acharya', 'acharyan'];
        return requiredKeywords.some(keyword => text.includes(keyword));
    }

    // Inject modal styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .thiruvadi-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 16px;
            box-sizing: border-box;
        }
        .thiruvadi-modal {
            background: #ffffff;
            border-radius: 12px;
            width: 100%;
            max-width: 400px;
            padding: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .thiruvadi-modal h3 {
            margin-top: 0;
            margin-bottom: 8px;
            font-size: 1.15rem;
            color: #1c1e21;
        }
        .thiruvadi-modal p {
            font-size: 0.85rem;
            color: #4b4f56;
            margin-bottom: 16px;
            line-height: 1.4;
        }
        .thiruvadi-modal label {
            display: block;
            font-size: 0.75rem;
            font-weight: 600;
            color: #4b4f56;
            margin-bottom: 4px;
            text-transform: uppercase;
        }
        .thiruvadi-modal input {
            width: 100%;
            padding: 8px 10px;
            border: 1px solid #ccd0d5;
            border-radius: 6px;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 16px;
        }
        .thiruvadi-modal input:focus {
            border-color: #0070ba;
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 112, 186, 0.15);
        }
        .thiruvadi-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }
        .thiruvadi-btn {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
        }
        .thiruvadi-btn-cancel {
            background-color: #e4e6eb;
            color: #050505;
        }
        .thiruvadi-btn-submit {
            background-color: #0070ba;
            color: #ffffff;
        }
    `;
    document.head.appendChild(style);

    // Create Modal Elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'thiruvadi-modal-overlay';
    modalOverlay.style.display = 'none';

    modalOverlay.innerHTML = `
        <div class="thiruvadi-modal" role="dialog" aria-modal="true" aria-labelledby="thiruvadiTitle">
            <h3 id="thiruvadiTitle">Thiruvadi Sambandam Verification</h3>
            <p>Please enter your Thiruvadi Sambandam details to unlock recitation for Thiruvaaimozhi.</p>
            <form id="thiruvadiForm" onsubmit="return false;">
                <label for="thiruvadiInput">Thiruvadi Sambandam Details</label>
                <input type="text" id="thiruvadiInput" placeholder="Enter Acharyan Thirunamam (e.g. Sri Ramanujar Swami)" required autocomplete="off" />
                <div class="thiruvadi-actions">
                    <button type="button" class="thiruvadi-btn thiruvadi-btn-cancel" id="thiruvadiCancelBtn">Cancel</button>
                    <button type="submit" class="thiruvadi-btn thiruvadi-btn-submit" id="thiruvadiSubmitBtn">Submit & Play</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const form = modalOverlay.querySelector('#thiruvadiForm');
    const input = modalOverlay.querySelector('#thiruvadiInput');
    const cancelBtn = modalOverlay.querySelector('#thiruvadiCancelBtn');

    function showModal() {
        input.value = '';
        modalOverlay.style.display = 'flex';
        input.focus();
    }

    function hideModal() {
        modalOverlay.style.display = 'none';
    }

    cancelBtn.addEventListener('click', hideModal);

    // Form submission action with validation checks
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const value = input.value.trim();

        // Check 1: Gibberish Validation
        if (isGibberish(value)) {
            alert('Please enter a valid Acharya Thirunamam.');
            input.focus();
            return;
        }

        // Check 2: Acharya Title Validation
        if (!isValidAcharyaName(value)) {
            alert('Please include "Sri" or "Swami" in the Acharya Thirunamam (e.g., "Sri Ramanujar Swami").');
            input.focus();
            return;
        }

        // Save & Proceed if valid
        if (selectedPrabandhamForPlay) {
            sessionStorage.setItem('thiruvadi_verified_' + selectedPrabandhamForPlay, 'true');
            sessionStorage.setItem('thiruvadi_info_' + selectedPrabandhamForPlay, value);
        }
        hideModal();
        
        // Trigger playback on verification
        if (typeof window.handlePlaybackToggle === 'function') {
            window.handlePlaybackToggle();
        }
    });

    // Capture clicks on ALL playback buttons (Play, Prev, Next, Rewind, Fast-Forward)
    document.addEventListener('DOMContentLoaded', function () {
        const navContainer = document.querySelector('.nav-controls');

        if (navContainer) {
            navContainer.addEventListener('click', function (event) {
                // Ensure click originated from a button inside nav-controls
                const button = event.target.closest('button');
                if (!button) return;

                const prefixSelect = document.getElementById('prefix');
                const selectedValue = prefixSelect ? prefixSelect.value : '';

                if (selectedValue === TVM_KEY) {
                    const isVerified = sessionStorage.getItem('thiruvadi_verified_' + TVM_KEY);

                    if (!isVerified) {
                        // Stop event from bubbling to navigation/playback functions
                        event.stopImmediatePropagation();
                        event.stopPropagation();
                        event.preventDefault();

                        // Force pause audio if actively playing
                        const player = document.getElementById('audioPlayer');
                        if (player && !player.paused) {
                            player.pause();
                        }

                        selectedPrabandhamForPlay = TVM_KEY;
                        showModal();
                    }
                }
            }, true); // Use event capture phase to catch before button click handlers fire
        }
    });
})();
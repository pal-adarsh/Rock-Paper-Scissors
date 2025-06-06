const choices = {
            rock: { icon: 'hand-rock', beats: 'scissors' },
            paper: { icon: 'hand-paper', beats: 'rock' },
            scissors: { icon: 'hand-scissors', beats: 'paper' }
        };
        
        let wins = 0;
        let losses = 0;
        let ties = 0;
        
        function getComputerChoice() {
            const keys = Object.keys(choices);
            const randomIndex = Math.floor(Math.random() * keys.length);
            return keys[randomIndex];
        }
        
        function animateComputerChoice() {
            const computerIcon = document.getElementById('computerIcon');
            computerIcon.classList.add('shake');
            
            // Cycle through icons during animation
            let count = 0;
            const interval = setInterval(() => {
                const keys = Object.keys(choices);
                const currentChoice = keys[count % keys.length];
                computerIcon.className = `fas fa-${choices[currentChoice].icon}`;
                count++;
            }, 100);
            
            setTimeout(() => {
                clearInterval(interval);
                computerIcon.classList.remove('shake');
            }, 1000);
        }
        
        function determineWinner(userChoice, computerChoice) {
            if (userChoice === computerChoice) {
                return 'tie';
            }
            
            if (choices[userChoice].beats === computerChoice) {
                return 'win';
            } else {
                return 'lose';
            }
        }
        
        function updateScore() {
            document.getElementById('wins').textContent = wins;
            document.getElementById('losses').textContent = losses;
            document.getElementById('ties').textContent = ties;
        }
        
        function makeChoice(userChoice) {
            // Animate computer choice
            animateComputerChoice();
            
            // Disable buttons during animation
            document.querySelectorAll('.choice-btn').forEach(btn => {
                btn.disabled = true;
            });
            
            setTimeout(() => {
                const computerChoice = getComputerChoice();
                
                // Update computer display
                const computerIcon = document.getElementById('computerIcon');
                computerIcon.className = `fas fa-${choices[computerChoice].icon}`;
                document.getElementById('computerText').textContent = `Chose ${computerChoice}`;
                
                // Determine result
                const result = determineWinner(userChoice, computerChoice);
                const resultText = document.getElementById('resultText');
                const resultIcon = document.getElementById('resultIcon');
                
                // Update result display
                resultIcon.className = `fas fa-${result === 'win' ? 'smile' : result === 'lose' ? 'frown' : 'meh'}`;
                resultText.className = 'result-text ' + result;
                
                switch(result) {
                    case 'win':
                        wins++;
                        resultText.textContent = 'You Win!';
                        resultIcon.classList.add('bounce');
                        break;
                    case 'lose':
                        losses++;
                        resultText.textContent = 'You Lose!';
                        resultIcon.classList.add('shake');
                        break;
                    case 'tie':
                        ties++;
                        resultText.textContent = "It's a Tie!";
                        resultIcon.classList.add('pulse');
                        break;
                }
                
                // Update score
                updateScore();
                
                // Re-enable buttons
                document.querySelectorAll('.choice-btn').forEach(btn => {
                    btn.disabled = false;
                });
                
                // Remove animations after they complete
                setTimeout(() => {
                    resultIcon.classList.remove('bounce', 'shake', 'pulse');
                }, 1000);
                
            }, 1000);
        }
        
        function resetGame() {
            wins = 0;
            losses = 0;
            ties = 0;
            updateScore();
            
            document.getElementById('resultText').textContent = 'Make your choice!';
            document.getElementById('resultText').className = 'result-text';
            document.getElementById('resultIcon').className = 'fas fa-question';
            
            document.getElementById('computerText').textContent = 'Waiting...';
            document.getElementById('computerIcon').className = 'fas fa-laptop';
            
            // Add pulse animation to reset button
            const resetBtn = document.getElementById('resetBtn');
            resetBtn.classList.add('pulse');
            setTimeout(() => {
                resetBtn.classList.remove('pulse');
            }, 500);
        }
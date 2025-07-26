document.addEventListener('DOMContentLoaded', function() {
    const tweetInput = document.getElementById('tweet-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const resultSection = document.querySelector('.result-section');
    const sentimentEmoji = document.getElementById('sentiment-emoji');
    const sentimentText = document.getElementById('sentiment-text');
    const exampleBtns = document.querySelectorAll('.example-btn');
    
    // Example tweets for demonstration
    const examples = [
        "I love this product! It's amazing!",
        "The service was terrible and slow.",
        "I'm feeling neutral about this update.",
        "This is the worst experience ever!!"
    ];
    
    // Set up example buttons
    exampleBtns.forEach((btn, index) => {
        btn.textContent = examples[index];
        btn.addEventListener('click', function() {
            tweetInput.value = examples[index];
        });
    });
    
    // Analyze button click handler
    analyzeBtn.addEventListener('click', function() {
        const tweet = tweetInput.value.trim();
        
        if (tweet === '') {
            alert('Please enter some text to analyze');
            return;
        }
        
        // In a real app, you would send this to your backend where the ML model is running
        // For this demo, we'll simulate the response
        analyzeSentiment(tweet);
    });
    
    // Try again button click handler
    tryAgainBtn.addEventListener('click', function() {
        resultSection.classList.add('hidden');
        tweetInput.value = '';
        tweetInput.focus();
    });
    
    // Function to analyze sentiment (simulated)
    function analyzeSentiment(tweet) {
        // Show loading state
        analyzeBtn.innerHTML = 'Analyzing <i class="fas fa-spinner fa-spin"></i>';
        analyzeBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // In a real implementation, you would call your backend here
            // For now, we'll use a mock response
            const mockResponse = getMockSentiment(tweet);
            
            // Display results
            displayResult(mockResponse);
            
            // Reset button
            analyzeBtn.innerHTML = 'Analyze Sentiment <i class="fas fa-search"></i>';
            analyzeBtn.disabled = false;
        }, 1000);
    }
    
    // Function to display the analysis result
    function displayResult(sentiment) {
        // Set emoji and text based on sentiment
        let emoji, text, colorClass;
        
        switch(sentiment) {
            case 'Positive':
                emoji = '😊';
                text = 'Positive Sentiment';
                colorClass = 'positive';
                break;
            case 'Negative':
                emoji = '😠';
                text = 'Negative Sentiment';
                colorClass = 'negative';
                break;
            case 'Neutral':
                emoji = '😐';
                text = 'Neutral Sentiment';
                colorClass = 'neutral';
                break;
            default:
                emoji = '🤔';
                text = 'Unknown Sentiment';
                colorClass = 'neutral';
        }
        
        sentimentEmoji.textContent = emoji;
        sentimentText.textContent = text;
        
        // Remove any previous color classes
        sentimentText.classList.remove('positive', 'negative', 'neutral');
        // Add the appropriate color class
        sentimentText.classList.add(colorClass);
        
        // Show the result section
        resultSection.classList.remove('hidden');
    }
    
    // Mock sentiment analysis function
    // In a real app, this would be replaced with an actual API call to your model
    function getMockSentiment(tweet) {
        const lowerTweet = tweet.toLowerCase();
        
        if (lowerTweet.includes('love') || lowerTweet.includes('amazing') || lowerTweet.includes('great')) {
            return 'Positive';
        } else if (lowerTweet.includes('hate') || lowerTweet.includes('terrible') || lowerTweet.includes('worst')) {
            return 'Negative';
        } else {
            return 'Neutral';
        }
    }
    
    // For a real implementation, you would replace getMockSentiment with:
    /*
    async function getRealSentiment(tweet) {
        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: tweet })
            });
            
            if (!response.ok) {
                throw new Error('Analysis failed');
            }
            
            const data = await response.json();
            return data.sentiment;
        } catch (error) {
            console.error('Error:', error);
            return 'Error';
        }
    }
    */
});
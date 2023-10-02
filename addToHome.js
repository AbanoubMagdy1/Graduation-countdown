const addBtn = document.querySelector("#addToHome")

let addHomeEvent;

function showInstallPrompt(){
    addBtn.classList.add("show");
}

window.addEventListener('beforeinstallprompt', function(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    addHomeEvent = e;
    // Update UI notify the user they can add to home screen
    showInstallPrompt();
})

addBtn.addEventListener("click", function(){
    addHomeEvent.prompt();
    addHomeEvent.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
            addBtn.classList.remove("show");
            console.log('User accepted the Add to Home screen prompt');
        } else {
            console.log('User dismissed the Add to Home screen prompt');
        }
        addHomeEvent = null;
    });
}, {once: true});
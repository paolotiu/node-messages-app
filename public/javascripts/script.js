const username = document.querySelector('#user');
const logOut = document.querySelector('#log-out');
if (username) {
    username.addEventListener('click', () => {
        logOut.classList.contains('show')
            ? logOut.classList.remove('show')
            : logOut.classList.add('show');
    });
}

const showModal = document.querySelector('#show-message-form');

if (showModal) {
    showModal.addEventListener('click', () => {
        const messageFormModal = document.querySelector(
            '.message-form-container.modal'
        );
        messageFormModal.style.display = 'block';
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == messageFormModal) {
                messageFormModal.style.display = 'none';
            }
        };
    });
}

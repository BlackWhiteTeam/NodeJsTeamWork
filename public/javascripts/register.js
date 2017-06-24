import toastr from 'toastr';

const userController = function (requester) {
    const userRequester = requester;

    function register(username, emailAddress, password) {
        const userData = {
            username: username,
            emailAddress: emailAddress,
            passHash: CryptoJS.SHA1(password).toString(),
        };

        const promise = new Promise((resolve, reject) => {
            $.ajax({
                url: '/register',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(userData),
                success: response => resolve(response),
                error: response => reject(response)
            });
        });

        return promise;
    }

    $("#register-submit").on("click", function () {
        const username = $("#username").val().trim();
        const emailAddress = $("#email").val().trim();
        const password = $("#pw").val().trim();
        const confirmPassword = $("#pw2").val().trim();
        //TODO: validations

        register(username, emailAddress, password)
            .then(function () {
                toastr.success("You are successfully registered!");
            }, function () {
                toastr.error("User with that name already exists");
            });
    });

};
export {userController};
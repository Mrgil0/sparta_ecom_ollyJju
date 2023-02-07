$(document).ready(function () {
    show_user();

});


let refresh = 0;


function show_user() {
    $.ajax({
        type: "GET",
        url: "/admin/users",
        data: {},
        success: function (response) {
            let rows = response["users"];
            for (let i = 0; i < rows.length; i++) {
                let user_idx = rows[i]["user_idx"];
                let name = rows[i]["user_name"];
                let phone = rows[i]["user_phone"];
                let email = rows[i]["user_email"];

                let temp_html = `
                    <tr>
                        <td>${name}</td>
                        <td>${phone}</td>
                        <td>${email}</td>
                        <td>
                            <button onclick="delete_user(${user_idx})" class="delete">탈퇴</button>
                        </td>
                    </tr>
                    `;
                $("#user_content").append(temp_html);
            }
        }
    })
}

function delete_user(user_idx) {
    $.ajax({
        type: "DELETE",
        url: `/admin/users/${user_idx}`,
        data: {},
        success: function (response) {
            refresh = 1;
            url = '/manage_user';
            modalOpen("유저 탈퇴 성공 !");
        }
    })

}
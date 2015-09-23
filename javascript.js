var userJsonData;

$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "users.json",
        success: function (data) {
            appendTable(data)
            userJsonData = data;
        }
    });
});


function appendTable(data) {
    data.forEach(function (user) {
        $('#user').append("<tr><td>" + user.firstName + "</td><td>" + user.lastName + "</td><td>" + user.phone + "</td><td>" + user.email + "</td></tr>");
    });

}
var cityJsonData;

$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "cities.json",
        success: function (data) {
            appendSelect(data)
            cityJsonData = data;
        }
    });
});

function appendSelect(data) {
    data.forEach(function (city) {
        $('#cityName').append('<option value="' + city.cityName + '">' + city.cityName + '</option>');
    });

}


$('#cityName').on('change', function () {
    var index = $('#cityName option:selected').index() - 1;
    var city = cityJsonData[index];
    $('#cityCode').text("City code for " + city.cityName + " " + city.cityCode);
    $('#numberOfInhabitants').text("Number of inhabitants in  " + city.cityName + " " + city.numberOfInhabitants);


});

var count = 0;

$('#removeTable').on('click', function () {
    $('#user').children().remove();
    count = 0;
});

$('#newTable').on('click', function () {
    var user = userJsonData[count];
    $('#user').append("<tr><td>" + user.firstName + "</td><td>" + user.lastName + "</td><td>" + user.phone + "</td><td>" + user.email + "</td></tr>");
    count++;
});

$('#allTables').on('click', function () {
    appendTable(userJsonData);
});

$('#search').on('keyup', function () {
    var searchInput = $('#search').val();
    var myExp = new RegExp(searchInput, 'i');
    $('#user').children().remove();
    $.each(userJsonData, function (key, user) {
        if ((user.firstName.search(myExp) != -1) || (user.lastName.search(myExp) != -1) || (user.phone.search(myExp) != -1) || (user.email.search(myExp) != -1)) {
            appendSearch(user);
        }

    });
});

function appendSearch(user) {
    $('#user').append("<tr><td>" + user.firstName + "</td><td>" + user.lastName + "</td><td>" + user.phone + "</td><td>" + user.email + "</td></tr>");
}
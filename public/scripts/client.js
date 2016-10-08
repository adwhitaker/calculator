$(function() {
  $('form').on('submit', submitInfo);
  $('#clear').on('click', clearInfo);
});

var MathForm = {};

// this function takes the information from the form and creates an object
function createObject (data) {
  data.forEach(function (element, index) {
    MathForm[element.name] = element.value;
  })
};

// submit form click function and send to server
function submitInfo () {
  event.preventDefault();
  var formData = $(this).serializeArray();
  createObject(formData)

  $.ajax({
    type: 'POST',
    url: '/math',
    data: MathForm,
    success: getComputation
  });
};

// returns computed math from server
function getComputation () {

  $.ajax({
    type: 'GET',
    url: '/math',
    success: function (amount) {
      $('#total').text(amount);
    }
  });
};

// clears info in the form
function clearInfo () {
  $('form').find('input[type=text], input[type=number]').val('');
};

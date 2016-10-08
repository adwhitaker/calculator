$(function() {
  $('form').on('submit', submitInfo);
  $('#clear').on('click', clearInfo);
  $('#equals').on('click', calcSubmit);
  $('.calculator').on('click', 'button', getValue);

});

var Type = '';
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
  console.log('serialized array', formData);
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
  $('#calcTotal').empty();
  $('#total').empty();
  var resetTotal = {'total': 0};

  $.ajax({
    type: 'POST',
    url: '/math/reset',
    data: resetTotal,
    success: function () {
      $('#calcTotal').empty();
      $('#total').empty();
    }
  })

};


function getValue () {
  var $pageTotal = $('#calcTotal').text();
  var $buttonValue = $(this).text()

  if (Number($buttonValue) < 10) {
    $pageTotal = $pageTotal + $buttonValue;
    $('#calcTotal').text($pageTotal);
  } else if ($buttonValue === '.') {
    $pageTotal = $pageTotal + $buttonValue;
    $('#calcTotal').text($pageTotal);
  }  else {
    type = $(this).data('value');
    console.log(type);
    $pageTotal = $pageTotal + ' ' + $buttonValue + ' ';
    $('#calcTotal').text($pageTotal);
  }
}

function calcSubmit () {
  console.log('inside submit');
  var amount = $('#calcTotal').text().split(' ');
  console.log(amount);
  createNewObject(amount);
  submitInfo();
}

function createNewObject (arr) {
  MathForm.x = arr[0];
  MathForm.type = type;
  MathForm.y = arr[2];
  console.log(MathForm);
}

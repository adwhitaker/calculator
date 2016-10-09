$(function() {
  $('form').on('submit', submitInfo);
  $('#clear').on('click', clearInfo);
  $('#equals').on('click', sendInfo);
  $('.calculator').on('click', 'button', getValue);
  $('.opperators').on('click', 'button', getOpp);
});

var MathForm = {
  x: '',
  type: '',
  y: '',
  total: null
};

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
    url: '/math/' + MathForm.type,
    data: MathForm,
    success: getComputation
  });
};

// returns computed math from server
function getComputation () {
  $.ajax({
    type: 'GET',
    url: '/math/',
    success: function (amount) {
      clearInfo();
      MathForm.total = amount;
      $('#x').val(MathForm.total);
      MathForm.x = '';
    }
  });
};

// clears info in the form
function clearInfo () {
  $('form').find('input[type=text], input[type=number]').val('');
  $('#secondNumber').addClass('hidden');
  $('#firstNumber').removeClass('hidden');
  MathForm.type = '';
  var resetTotal = {'total': null};

  $.ajax({
    type: 'POST',
    url: '/math/reset',
    data: resetTotal,
    success: function () {
      MathForm.x = '';
      MathForm.y = '';
    }
  })
};

function getValue () {
  var buttonValue = $(this).data('value');

  if (MathForm.type === '') {
    if (MathForm.x === '') {
      MathForm.x = MathForm.x + buttonValue.toString();
      $('#x').val(MathForm.x);
    } else {
      var xVal = $('input[id=x]').val();
      MathForm.x = xVal;
      MathForm.x = MathForm.x + buttonValue.toString();
      $('#x').val(MathForm.x);
    }
  } else {
    var yVal = $('input[id=y]').val();
    MathForm.y = yVal;
    MathForm.y = MathForm.y + buttonValue.toString();
    $('#y').val(MathForm.y);
  }
}

function getOpp () {
  oppSymbol = $(this).text()
  MathForm.type = $(this).data('name');
  $('input[id=type]').val(MathForm.type);
  $('#secondNumber').removeClass('hidden');
  $('#firstNumber').addClass('hidden');
}

function sendInfo (event) {
  event.preventDefault;
  $('#submitForm').submit();
}

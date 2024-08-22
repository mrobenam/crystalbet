// Problem: Hints are shown even when form is valid
// Solution: Hide and show them at appropriate times
var $password = $("#password");
var $confirmPassword = $("#confirm_password");
var $submitButton = $("#submit");

// Hide hints initially
$("form span").hide();

function isPasswordValid() {
  return $password.val().length > 8;
}

function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}

function canSubmit() {
  return isPasswordValid() && arePasswordsMatching();
}

function showHints() {
  if (!isPasswordValid()) {
    $password.next().show();
  }
  if (!arePasswordsMatching()) {
    $confirmPassword.next().show();
  }
}

function hideHints() {
  $password.next().hide();
  $confirmPassword.next().hide();
}

// Event handlers for password and confirm password inputs
$password.focus(showHints).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
$confirmPassword.focus(showHints).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

function passwordEvent() {
  if (isPasswordValid()) {
    $password.next().hide();
    enableSubmitEvent();
  } else {
    $password.next().show();
    enableSubmitEvent();
  }
}

function confirmPasswordEvent() {
  if (arePasswordsMatching()) {
    $confirmPassword.next().hide();
    enableSubmitEvent();
  } else {
    $confirmPassword.next().show();
    enableSubmitEvent();
  }
}

function enableSubmitEvent() {
  $submitButton.prop("disabled", !canSubmit());
}

// Call enableSubmitEvent initially to handle the case where the form is already valid when it loads
enableSubmitEvent();

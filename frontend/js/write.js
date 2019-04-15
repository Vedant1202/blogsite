$(document).ready(function() {

  function toggleSidebar() {
    $(".button").toggleClass("active");
    $("main").toggleClass("move-to-left");
    $(".sidebar-item").toggleClass("active");
  }

  $(".button").on("click tap", function() {
    toggleSidebar();
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      toggleSidebar();
    }
  });

});



$('#submit').click(function () {

  var title = $('#title').val();
  var text = CKEDITOR.instances.editor1.getData();

  if (title && text) {

    var data = {
      'username': getData('user')['valid'],
      'title': title,
      'text': text,
    }
    console.log(data);

      $.ajax({
        type: "POST",
        url: 'http://localhost:5000/blog/add',
        data: data,
        success: function(data) {
          alert('Blog posted!');
          $('#title').val('');
          CKEDITOR.instances.editor1.setData('');
          window.location.reload();
        },
       error: function(error) {
         console.log(error);
       },
       dataType: 'json'
      });


  } else {
    alert('Please fill out all fields');
  }

});













































var fakeProgress = function() {
  var $btn = $('.submit'),
    percent = ($btn.attr('data-percent')) ? Number($btn.attr('data-percent')) + 1 : 0;
  if (percent >= 0 && percent <= 100) {
    $btn.attr('data-percent', percent);
  } else {
    $btn
      .removeAttr('data-percent')
      .removeClass('loader loading')
      .addClass('success');
    clearInterval(progress);
  }
}

$('.submit:not(disabled)').click(function() {
  $(this)
    .prop('disabled', true)
    .addClass('loader')
    .on('transitionend', function() {
      progress = setInterval(fakeProgress, 10);
      $(this)
        .addClass('loading')
        .off('transitionend');
    });
});

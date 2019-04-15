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




  $.ajax({
    type: "POST",
    url: 'http://localhost:5000/blog/myblogs',
    data: {'username': getData('user')['valid']},
    success: function(data) {
      if(data['blogs'].length == 0) {
        // alert('done')
        $('#noblogs').addClass('showelem');

      } else {
        data = data['blogs'];
        blogTemplate = $('#blog-template').html();

        for (var i = 0; i < data.length; i++) {

          dt = String(data[i][3]);
          dt = moment(dt, 'YYYY-MM-DD HH:mm:ss');
          console.log((moment(dt)).to(moment()));

          var html = Mustache.render(blogTemplate, {
            title: String(data[i][4]),
            username: String(data[i][1]),
            text: data[i][2],
            timespan: (moment(dt)).to(moment()),
            month: dt.format('MMMM'),
            date: dt.format('D')
          });

          $('#maindiv').append(html);

        }
      }
    },
   error: function(error) {
     console.log(error);
   },
   dataType: 'json'
  });

});

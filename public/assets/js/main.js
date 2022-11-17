// Header Connect

(function () {
  const header = $(".js-header"),
    popup = header.find(".avatar_popup"),
    icon = header.find(".header_avatar");

  icon.on("click", function (e) {
    e.stopPropagation();
    popup.toggleClass("visible");
  });
  $(document).on("click", "body", function (e) {
    if (!$(e.target).is(".visible")) popup.removeClass("visible");
  });
})();

var mobileNav = function () {
  var mobile = window.matchMedia("(max-width: 991px)");
  var wrapMenu = $("#site-header-inner .wrap-inner");
  var navExtw = $(".nav-extend.active");
  var navExt = $(".nav-extend.active").children();

  responsivemenu(mobile);

  mobile.addListener(responsivemenu);

  function responsivemenu(mobile) {
    if (mobile.matches) {
      $("#main-nav")
        .attr("id", "main-nav-mobi")
        .appendTo("#header_main")
        .hide()
        .children(".menu")
        .append(navExt)
        .find("li:has(ul)")
        .children("ul")
        .removeAttr("style")
        .hide()
        .before('<span class="arrow"></span>');
    } else {
      $("#main-nav-mobi")
        .attr("id", "main-nav")
        .removeAttr("style")
        .prependTo(wrapMenu)
        .find(".ext")
        .appendTo(navExtw)
        .parent()
        .siblings("#main-nav")
        .find(".sub-menu")
        .removeAttr("style")
        .prev()
        .remove();

      $(".mobile-button").removeClass("active");
      $(".mobile-button-style2").removeClass("active");
      $(".sub-menu").css({ display: "block" });
    }
  }
  $(document).on("click", ".mobile-button", function () {
    $(this).toggleClass("active");
    $("#main-nav-mobi").slideToggle();
  });
  $(document).on("click", "#main-nav-mobi .arrow", function () {
    $(this).toggleClass("active").next().slideToggle();
  });
};
mobileNav();

// Dark Light Mode
// $(document).on("click", ".dark", function (e) {
//   e.preventDefault();
//   $(".body").addClass("is_dark");
//   $(".light").removeClass("is_active")
//   $(".dark").addClass("is_active")

//   $(".tf-text").removeClass("style");
//   $(".tf-text").addClass("s1");
//   document.getElementById("logo_header").src = "assets/images/logo/logo2@2x.png";
//   document.getElementById("logo_footer").src = "assets/images/logo/logo2@2x.png";
// });

// $(document).on("click", ".light", function (e) {
//   e.preventDefault();
//   $(".body").removeClass("is_dark");
//   $(".light").addClass("is_active")
//   $(".dark").removeClass("is_active")

//   $(".tf-text").addClass("style");
//   $(".tf-text").removeClass("s1");
//   document.getElementById("logo_header").src = "assets/images/logo/logo2@2x.png";
//   document.getElementById("logo_footer").src =
//     "assets/images/logo/logo2.png";
//   console.log(1);
// });

$(function () {

    $.ajax({
        type: 'GET',
        url: 'https://sky-frontend.herokuapp.com/movies',
    }).then(data => {
        data.forEach(slide => {
            switch (slide.type) {
                case 'highlights':
                    return slickHightlights(slide);
                case 'carousel-portrait':
                    return slickResponsive(slide);
            }
        });
    });

    const slickHightlights = highlights => {
        $('.slickcenter').html(highlights.items.map(
            item => `
            <div class="items">
            <img src="${item.images[0].url}"
            alt="${item.title}">
        </div>
        `
        )).slick({
            centerMode: true,
            infinite: true,
            arrows: false,
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [

                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,

                    }
                }
            ]
        })
    };

    const slickResponsive = movies => {
        $('.carousel-title-movie').text(movies.title);
        $('.slickresponsive').html(movies.movies.map(
            item => `

        <div class="items">
                    <img src="${item.images[0].url}"
                        alt="${item.title}">
                </div>
        `
        )).slick({
            dots: false,
            infinite: false,
            speed: 300,
            arrows: false,
            variableWidth: true,
            slidesToShow: 6,
            slidesToScroll: 6,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2

                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };

})
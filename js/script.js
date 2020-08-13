class Slider {
    constructor(element) {
        this.slider = document.querySelector(element.slider)
        this.sliderLine = document.querySelector(element.sliderLine)
        this.slides = this.sliderLine.children
        this.prev = document.querySelector('.slider__prev')
        this.next = document.querySelector('.slider__next')

        this.time=element.time
        this.autoplay=element.autoplay

        this.direction = element.direction.toUpperCase() == 'Y' ? 'Y' : 'X'
        this.height = this.slider.clientHeight
        this.width = this.slider.clientWidth

        this.moveSize = this.direction == 'X' ? this.width : this.height
        this.activeSlide = 0

        this.sliderLine.style = `position:relative;
                               height: ${this.height}px;
                               width: ${this.width}px;
                               overflow: hidden;`


        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i]
            slide.style = `position: absolute;
                         height: ${this.height}px;
                         width: ${this.width}px;`

            if (this.activeSlide != i) {
                slide.style.transform = `translate${this.direction}(${this.moveSize}px)`
            }
            if (this.slides.length - 1 == i) {
                slide.style.transform = `translate${this.direction}(${-this.moveSize}px)`
            }
        }

        // console.log(this.slider, this.sliderLine, this.slides, this.prev, this.next, this.direction);
        this.prev.addEventListener('click', () => this.move(this.prev))
        this.next.addEventListener('click', () => this.move(this.next))

        if (this.autoplay=="true"){
            let interval=setInterval(() => {
            this.move(this.next)
        }, this.time*2);

        this.slider.addEventListener('mouseenter', ()=>{
            clearInterval(interval)
        })

        this.slider.addEventListener('mouseleave', ()=>{
            interval=setInterval(() => {
                this.move(this.next)
            }, this.time*2);
        })

        }

        
      
    }
    move(btn) {
        this.prev.disabled = true
        this.next.disabled = true
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, this.time);


        let leftOrRight = btn == this.prev ? this.moveSize : -this.moveSize
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i]
            slide.style.transition = '0ms'
            if (this.activeSlide != i) {
                slide.style.transform = `translate${this.direction}(${-leftOrRight}px)`
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.direction}(${leftOrRight}px)`
        this.slides[this.activeSlide].style.transition = `${this.time}ms`

        if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        } else if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide > this.slides.length - 1) {
                this.activeSlide = 0
            }
        }
        this.slides[this.activeSlide].style.transform = `translate${this.direction}(0px)`
        this.slides[this.activeSlide].style.transition = `${this.time}ms`

        console.log(this.activeSlide);
       

    }
}

const slider = new Slider({
    slider: '.slider',
    sliderLine: '.slider__line',
    direction: 'x',
    time: '500',
    autoplay: 'false',

})
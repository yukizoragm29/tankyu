document.addEventListener('DOMContentLoaded', () => {
    // ヒーローセクションのフェードインアニメーション
    const fadeInElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
    fadeInElements.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 1s ease-out';
        
        let delay = 0;
        if (el.classList.contains('fade-in-delay')) {
            delay = 0.5;
        } else if (el.classList.contains('fade-in-delay-2')) {
            delay = 1.0;
        }

        setTimeout(() => {
            el.style.opacity = 1;
        }, delay * 1000);
    });

    // ハンバーガーメニューのトグル機能 (モバイル用)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-open'); // CSSで開閉スタイルを定義
        });
    }

    // スクロール時に要素をフェードインさせる機能 (オプション)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sections = document.querySelectorAll('.section-padding');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('scroll-fade'); // 初期状態は非表示にするためのクラス
        observer.observe(section);
    });
});
// (CSSに .scroll-fade { opacity: 0; transition: opacity 1s; } と .scroll-fade.is-visible { opacity: 1; } の定義が必要です)
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Carousel.css';

// Position absolute text

function Carousel({ onChange }) {
  const ref = useRef();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const cards = ref.current.querySelectorAll('.carousel__card');

      const config = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setSelected(entry.target.dataset.item);
            onChange(entry.target.dataset.colour);
          }
        });
      }, config);

      cards.forEach(card => {
        observer.observe(card);
      });
    }
  }, []);

  const cardAnimation = {
    hidden: { opacity: 0, x: '300%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.6,
        x: { type: 'spring', stiffness: 100 },
        default: { duration: 0.8 }
      }
    }
  };

  // const text = {
  //   hidden: { opacity: 0, y: '50px' },
  //   visible: { opacity: 1, y: 0 }
  // };

  const content = {
    visible: {
      opacity: 1,
      y: 0
    },
    hidden: {
      opacity: 0,
      y: '-25vh',
      transition: {
        duration: 0.5
      }
    }
  };

  const yellow = '#ffd200';
  const purple = '#444ce1';
  const red = '#ff5f22';

  return (
    <motion.ul className="carousel" ref={ref}>
      <motion.li
        className={['carousel__card', selected == 1 && 'active'].join(' ')}
        data-item={1}
        data-colour={yellow}
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
      >
        <img
          src="https://source.unsplash.com/3MAmj1ZKSZA/600x533"
          alt="A random object"
        />
        <motion.div
          className="carousel__card__content"
          animate={selected == 1 ? 'visible' : 'hidden'}
          variants={content}
        >
          <motion.span className="carousel__card__date">
            Until 29 jan
          </motion.span>
          <motion.h3 className="carousel__card__title">Bridget Riley</motion.h3>
        </motion.div>
      </motion.li>

      <motion.li
        className={['carousel__card', selected == 2 && 'active'].join(' ')}
        data-item={2}
        data-colour={purple}
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
      >
        <img
          src="https://source.unsplash.com/xb0wLfZH9Zo/600x533"
          alt="A random object"
        />
        <motion.div
          className="carousel__card__content"
          animate={selected == 2 ? 'visible' : 'hidden'}
          variants={content}
        >
          <motion.span className="carousel__card__date">
            Until 29 jan
          </motion.span>
          <motion.h3 className="carousel__card__title">Bridget Riley</motion.h3>
        </motion.div>
      </motion.li>

      <motion.li
        className={['carousel__card', selected == 3 && 'active'].join(' ')}
        data-item={3}
        data-colour={red}
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
      >
        <img
          src="https://source.unsplash.com/9QAfsPuGFhs/600x533"
          alt="A random object"
        />
        <motion.div
          className="carousel__card__content"
          animate={selected == 3 ? 'visible' : 'hidden'}
          variants={content}
        >
          <motion.span className="carousel__card__date">
            Until 29 jan
          </motion.span>
          <motion.h3 className="carousel__card__title">Bridget Riley</motion.h3>
        </motion.div>
      </motion.li>
    </motion.ul>
  );
}

export default Carousel;

import React, { useContext, useState } from 'react';
import './productView.css';
import GoBack from '../GoBack/GoBack';
import { ReactComponent as Like } from '../Card/img/Like.svg';
import { CardContext } from '../../context/cardContext';
import { Truck, Award, ZoomIn } from 'react-bootstrap-icons';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductReviews from '../ProductReviews/ProductReviews';
import { getEndings, productRating } from '../../utils/utils';
import Rate from '../Rate/Rate';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { changingLikeOnProductCards } from '../../store/slices/productsSlice';
import BasketController from '../Basket/BasketController/BasketController';
import { addBasketProduct } from '../../store/slices/basketSlice';
import Chart from '../Chart/Chart';
import { Link } from 'react-router-dom';

const ProductView = ({ productInfo }) => {
    const { setActiveModal } = useContext(CardContext);
    const { userData } = useSelector((s) => s.user);
    const { reviews: allReviews } = useSelector((s) => s.oneProduct);
    const dispatch = useDispatch();
    const { basketProducts } = useSelector((s) => s.basket);
    const product1 = basketProducts.find((e) => e.product._id === productInfo._id);
    const cardLiked = productInfo.likes ? productInfo.likes.includes(userData._id) : false;
    const [showTab, setShowTab] = useState(1);

    const toggleTab = (i) => {
        setShowTab(i);
    };

    const changeLikeCardOne = (productInfo, cardLiked) => {
        dispatch(changingLikeOnProductCards({ product: productInfo, cardLiked }));
    };

    return (
        <>
            <div className='product__wrapper'>
                <div className='product__title_wrapper'>
                    <GoBack />
                    <h3 className='product__title'>{productInfo.name}</h3>
                    <div className='product__rating'>
                        <span>Artikul</span>
                        <Rate rating={productRating(allReviews)} />
                        <span>
                            {allReviews?.length} {getEndings(allReviews?.length, 'Отзыв')}
                        </span>
                    </div>
                </div>
                <div className='product__content_wrapper'>
                    <div className='product__img_wrapper'>
                        <div className='card__sticky card__sticky_left'>
                            {productInfo.discount ? (
                                <span className='card__discount'>-{productInfo.discount}%</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className='card__sticky card__sticky_right'>
                            <button
                                onClick={() => changeLikeCardOne(productInfo, cardLiked)}
                                className={`btn__like ${
                                    cardLiked ? 'card__like_active' : 'card__like'
                                }`}
                            >
                                <Like />
                            </button>
                        </div>
                        <img className='product__img' src={productInfo.pictures} alt='' />
                        <ZoomIn className='zoom__picture' onClick={() => setActiveModal(true)} />
                    </div>
                    <div className='product__inCart_wrapper'>
                        <ProductPrice productInfo={productInfo} />
                        <div className='product__inCart_btns'>
                            <BasketController product={productInfo} count={product1?.count} />
                            {productInfo.stock > 0 ? (
                                !basketProducts.find((i) => i.product._id === productInfo._id) ? (
                                    <button
                                        className='btn_basket'
                                        onClick={() => {
                                            dispatch(
                                                addBasketProduct({ product: productInfo, count: 1 })
                                            );
                                        }}
                                    >
                                        В Корзину
                                    </button>
                                ) : (
                                    <Link to='/basket'>
                                        <button className='btn_basket-basket'>Уже в корзине</button>
                                    </Link>
                                )
                            ) : (
                                <button className='btn_basket-none'>Нет в наличии</button>
                            )}
                        </div>
                        <div className='product__delivery'>
                            <Truck width={32} height={32} />
                            <div className='product__text'>
                                <h4>Доставка по всему Миру!</h4>
                                <p>
                                    Доставка курьером — <b>от 399 ₽</b>
                                </p>
                                <p>
                                    Доставка в пункт выдачи — <b>от 199 ₽</b>
                                </p>
                            </div>
                        </div>
                        <div className='product__quality'>
                            <Award className='award' />
                            <div className='product__text'>
                                <h4>Гарантия качества</h4>
                                <p>
                                    Если Вам не понравилось качество нашей продукции, мы вернем
                                    деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                                    нужды.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product__description'>
                    <span className='product__description_title'>Описание</span>
                    <span>{productInfo.description}</span>
                </div>
                <div className='tabs__container'>
                    <div className='tabs__block'>
                        <div
                            className={showTab === 1 ? 'tabs tabs_active' : 'tabs'}
                            onClick={() => toggleTab(1)}
                        >
                            Отзывы
                        </div>
                        <div
                            className={showTab === 2 ? 'tabs tabs_active' : 'tabs'}
                            onClick={() => toggleTab(2)}
                        >
                            Графики
                        </div>
                    </div>
                    <div className='tabs__content_container'>
                        <div className={showTab === 1 ? 'tabs__content_active' : 'tabs__content'}>
                            <ProductReviews productInfo={productInfo} />
                        </div>
                        <div className={showTab === 2 ? 'tabs__content_active' : 'tabs__content'}>
                            {!!Object.keys(productInfo).length && (
                                <Chart productInfo={productInfo} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                children={
                    <div className='product__img_container-modal'>
                        <img className='product__img' src={productInfo.pictures} alt='' />
                    </div>
                }
            />
        </>
    );
};

export default ProductView;

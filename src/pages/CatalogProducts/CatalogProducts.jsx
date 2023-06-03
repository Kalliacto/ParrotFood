import React, { useContext } from 'react';
import { CardList } from '../../components/CardList/CardList';
import './catalogProduct.css';
import SortCards from '../../components/SortCards/SortCards';
import { CardContext } from '../../context/cardContext';
import { getEndings } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';
import { useSelector } from 'react-redux';

const CatalogProducts = ({ allCards, paginate }) => {
    const { search, currentCards } = useContext(CardContext);

    const { dataProducts } = useSelector((s) => s.products);

    return (
        <>
            {search ? (
                <p className='search__info'>
                    По запросу <b>{search}</b>
                    {dataProducts.length === 1 ? ' найден' : ' найдено'}{' '}
                    <b>{dataProducts.length}</b>
                    {getEndings(dataProducts.length, 'товар')}
                </p>
            ) : (
                ''
            )}
            <SortCards />
            <CardList cards={currentCards} />
            <Pagination allCards={allCards} paginate={paginate} />
        </>
    );
};

export default CatalogProducts;

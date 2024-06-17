import { useState, useEffect, useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/searchResult?name=${encodeURIComponent(searchValue)}`);
        }
    };



    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            placement='bottom-start'
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className="w-[600px]">
                        <div className="">iphone12</div>
                        <div className="">iphone11</div>
                        <div className="">iphone6</div>
                        <div className="">iphone14</div>
                        <div className="">iphone15</div>

                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div >
                <form onSubmit={handleSubmit} className={cx('wrap-input')}>
                    <input
                        ref={inputRef}
                        value={searchValue} c
                        className={cx('input-search')}
                        placeholder='Tìm kiếm sản phẩm'
                        spellCheck={false}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    <button type='submit' className={cx('btn-search')} >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>

        </HeadlessTippy>

    );
}

export default Search;
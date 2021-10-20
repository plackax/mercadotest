import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery } from '../../services';
import logo from './../../assets/logo.png';
import lupa from './../../assets/lupa.png';

const SearchBox = () => {
    let history = useHistory();
    const query = useQuery();
    const curSearch = query.get('search');

    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        setSearch(curSearch ?? '');
    }, [curSearch]);
    
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (search.trim().length) {
            history.push({
                pathname: '/items',
                search: '?search=' + search
            });
        } else {
            history.push('/');
        }
    }

    const handleSearchInput = (event:FormEvent<HTMLInputElement>):void => {
        setSearch(event.currentTarget.value)
    }

    

    return (
        <header className="header">
            <div className="headerContainer">
                <Link to="/">
                    <img src={logo} className="logo" alt="Logo Mercadolibre" />
                </Link>
                <form className="searchBox" onSubmit={handleSubmit}>
                    <input
                        className="searchBoxInput"
                        type="search"
                        value={search}
                        onInput={handleSearchInput}
                        placeholder="Buscar productos, marcas y más..."
                    />
                    <button className="searchBoxButton" type="submit">
                        <img src={lupa} alt="Ícono de búsqueda" />
                    </button>
                </form>
            </div>
        </header>
    );
}

export default SearchBox;
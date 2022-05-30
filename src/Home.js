import Logo from './logo.svg';
import Logo2 from './logo512.png';

function Home() {
    // return 'abc';
    return (
        <div>
            <h1>How are you</h1>
            <h3>How are you</h3>
            <img src={Logo} />
            <img src={Logo2} />
            <img src={Logo} />
        </div>
    );
}

export default Home;
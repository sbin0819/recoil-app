import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; // style-reset 패키지
import { color1 } from './colors';

const GlobalStyles = createGlobalStyle` 
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        background-color: #2C272E;
        color: ${color1.primary};
    }
    input, select, textarea{
        background-color: #2C272E;
        color: ${color1.primary};
    }
    textarea:focus, input:focus {
        outline: none; 
    }
`;

export default GlobalStyles;

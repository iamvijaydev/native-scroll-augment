import styled, { keyframes } from 'styled-components'

const Article = styled.article`
  padding: 2rem;
  overflow-y: auto;
  color: #24292e;
  height: 100%;
  box-sizing: border-box;

  h1 {
    font-size: 3rem;
    padding: 0 0 1rem 0;
    margin: 0 0 1rem 0;
    border-bottom: 1px solid #eaecef;
  }

  h2 {
    font-size: 2rem;
    padding: 0 0 1rem 0;
    margin: 3rem 0 1rem 0;
    border-bottom: 1px solid #eaecef;
  }

  h3 {
    font-size: 1.7rem;
    font-weight: 480;
    margin: 2.5rem 0 0 0;
  }

  p {
    font-size: 1.5rem;
    margin: 2rem 0 2rem 0;

    &:empty {
      display: none;
    }
  }

  pre {
    margin: 1rem 0;
    padding: 1rem;
    background: #eaecef;
    border-radius: 3px;
  }

  code {
    font-size: 1.3rem;
  }
`

export default Article

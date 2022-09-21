import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import styles from 'styles/Navbar.module.scss';
import { useRouter } from 'next/router';

function BasicExample() {
  const router = useRouter();
  return (
    <Navbar expand="sm" fixed="top" id={styles.navigator}>
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image src="/Logo.png" alt="베지밀의 로고, 그릇에서 새싹이 발아하는 모습을 형상화했다."
          width={110} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" id={styles.menus}>
            <Nav.Link href="/" className={router.pathname == "/" ? "nav_active" : "" }>홈</Nav.Link>
            <Nav.Link href="/recipe" className={router.pathname == "/recipe" ? "nav_active" : "" }>레시피</Nav.Link>
            <Nav.Link href="/cart" className={router.pathname == "/cart" ? "nav_active" : "" }>장바구니</Nav.Link>
            <Nav.Link href="/prices" className={router.pathname == "/prices" ? "nav_active" : "" }>물가분석</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
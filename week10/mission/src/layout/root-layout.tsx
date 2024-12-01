import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styled from "styled-components";

const RootLayout = () => {
    return (
        <Container>
            <Navbar />
            <Main>
                <Sidebar />
                <Content>
                    <Outlet />
                </Content>
            </Main>
        </Container>
    );
};

export default RootLayout;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const Main = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
`;

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
`;

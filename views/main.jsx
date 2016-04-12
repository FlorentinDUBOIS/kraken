import React    from "react";
import ReactDOM from "react-dom";
import {Container} from "./components/container.jsx";
import {Card, CardHeader, CardBody} from "./components/card.jsx";
import {Row, Col} from "./components/grid.jsx";
import {Breadcrumbs, BreadcrumbsItem} from "./components/breadcrumbs.jsx";
import {Collection, CollectionItem} from "./components/collection.jsx";

const main = (
    <main>
        <div className="blue darken-3" style={{ height: '100%' }} >
            <Row>
                <Col col="l12" >
                <Breadcrumbs className="white" >
                    <BreadcrumbsItem className="black-text" >dqsdqs</BreadcrumbsItem>
                    <BreadcrumbsItem className="black-text" >dqsdqs</BreadcrumbsItem>
                    <BreadcrumbsItem className="black-text" >dqsdqs</BreadcrumbsItem>
                </Breadcrumbs>
                </Col>
            </Row>

            <Row>
                <Col col="l3" >
                    <Collection>
                        <CollectionItem>qsd</CollectionItem>
                    </Collection>
                </Col>

                <Col col="l9" >
                    <Collection>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                        <CollectionItem>qsd</CollectionItem>
                    </Collection>
                </Col>
            </Row>
        </div>
    </main>
);

ReactDOM.render( main, document.querySelector( 'body' ));

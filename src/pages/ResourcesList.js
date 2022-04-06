import React from "react";
import {
    DisplayText,
    Frame,
    Layout,
    Button,
    TextStyle,
    Card,
    ResourceItem,
    ResourceList,
    Toast,
    Badge,
} from "@shopify/polaris";
import { homeList } from "../data/index";
import emitter from "../utilities/ev";
import HowToUseBanner from "../components/HowToUseBanner";
class ResourcesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toastTitle: "",
            toastActive: false,
            exportLoading: false,
            activeExport: false,
            items: homeList,
        };
    }

    handleExport() {
        if (window.__PERMISSION__.hasBulkExport) {
            this.setState({ activeExport: true });
            return;
        }

        emitter.emit("openPlanModal", "bulk_export");
    }

    toggleActive() {
        this.setState({ toastActive: !this.state.toastActive });
    }

    handleCloseModal(state, activeName) {
        this.setState({ [activeName]: false });
        if (!!state) {
            this.setState({ toastActive: true, toastTitle: `Export ${state}` });
        }
    }

    handleResourceItemClick(item) {
        const {
            ownerResource,
            exportOwnerResource,
            title,
            apiPath,
            metafieldsName,
        } = item;

        if (ownerResource == "shop") {
            this.props.history.push(
                `/shopify-metafields/editor/${ownerResource}?topBarTitle=${title}&id=${""}&exportOwnerResource=${exportOwnerResource}&metafieldsName=${metafieldsName}`
            );
        } else {
            this.props.history.push(
                `/shopify-metafields/first-list/${ownerResource}?topBarTitle=${title}&apiPath=${apiPath}&exportOwnerResource=${exportOwnerResource}&metafieldsName=${metafieldsName}`
            );
        }
    }

    render() {
        const { activeExport, toastActive, toastTitle } = this.state;

        return (
            <div className="wrapper">
                <Frame>
                    <div className="resources-list">
                        <div className="container">
                            <HowToUseBanner />
                            <DisplayText element="h1" size="medium">
                                <span className="b">
                                    Welcome to the Grow Force Metafields Master
                                </span>
                            </DisplayText>

                            <div className="mt10">
                                <Card>
                                    <ResourceList
                                        resourceName={{
                                            singular: "customer",
                                            plural: "customers",
                                        }}
                                        items={this.state.items}
                                        renderItem={(item) => {
                                            const {
                                                id,
                                                title,
                                                image,
                                                description,
                                            } = item;
                                            const media = (
                                                <img src={image} alt="" />
                                            );

                                            return (
                                                <div
                                                    className={
                                                        id == 9
                                                            ? "active"
                                                            : "disabled"
                                                    }
                                                >
                                                    <ResourceItem
                                                        id={id}
                                                        media={media}
                                                        accessibilityLabel={`View details for ${title}`}
                                                        onClick={() => {
                                                            this.handleResourceItemClick(
                                                                item
                                                            );
                                                        }}
                                                    >
                                                        <h3>
                                                            <TextStyle variation="strong">
                                                                {title}
                                                            </TextStyle>
                                                        </h3>
                                                        <div>{description}</div>
                                                    </ResourceItem>
                                                </div>
                                            );
                                        }}
                                    />
                                </Card>
                            </div>
                        </div>
                    </div>
                </Frame>
            </div>
        );
    }
}

export default ResourcesList;

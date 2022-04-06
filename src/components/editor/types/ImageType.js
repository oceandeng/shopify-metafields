import React from "react";
import Loading from "../../Loading";
import ConfirmModal from "../../dialog/ConfirmModal";
import {
    TextStyle,
    Stack,
    Card,
    DropZone,
    Thumbnail,
    Button,
    TextField,
    InlineError,
    Icon,
    Toast,
} from "@shopify/polaris";
import { NoteMinor, DeleteMajor, PackageMajor } from "@shopify/polaris-icons";
class ImageType extends React.Component {
    constructor(props) {
        super(props);
        this.imageSize = "20";
        this.filesMaxNum = 10;
        this.files = this.props.data.value;
        this.apiPath = `${window.appEnvironment.apiURL}upload`;
        this.validImageTypes = [
            "image/gif",
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/bmp",
            "image/x-icon",
            "image/vnd.microsoft.icon",
        ];
        this.validFileTypes = [
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            ".pptx",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
            "text/csv",
            "text/plain",
            "application/zip",
            "application/x-zip-compressed",
            "application/x-rar",
        ];
        this.allowMultiple = this.props.allowMultiple || false;
        this.isFile = this.props.isFile || false;
        this.type = this.isFile ? "file" : "image";
        this.accept = this.props.isFile
            ? this.validFileTypes
            : this.validImageTypes;

        this.state = {
            active: false,
            toastTitle: "Success",
            openFileDialog: false,
            files: !!this.props.data.value
                ? this.props.data.value.split(",")
                : [],
            loading: false,
        };
    }

    toggleActive() {
        this.setState({ active: !this.state.active });
    }

    toggleOpenFileDialog() {
        this.setState({ openFileDialog: !this.state.openFileDialog });
    }

    handleDropZoneDrop(dropFiles, _acceptedFiles, _rejectedFiles) {
        let l = this.state.files.length;
        if (l + dropFiles.length > this.filesMaxNum) {
            this.setState({
                toastTitle: `You can only upload ${this.filesMaxNum} images in one metafield.`,
                active: true,
            });
            return;
        }
        let params = new FormData();
        let arr = [];
        let bigFile = [];
        !!dropFiles.length &&
            dropFiles.forEach((file) => {
                console.log(file.type, 111);

                if (
                    this.validImageTypes.includes(file.type) ||
                    this.validFileTypes.includes(file.type) ||
                    file.type == ""
                ) {
                    if (file.size / 1024 / 1024 > this.imageSize) {
                        bigFile.push(file);
                        return;
                    }
                    params.append("resource[]", file);
                    arr.push(file);
                } else {
                    console.log("error");
                }
            });
        if (bigFile.length > 0) {
            let fileName = bigFile.map((v) => v.name);
            this.setState({
                active: true,
                toastTitle: `Only less than ${this.imageSize} MB allowed`,
            });
        }
        params.append("dir", `${this.type}s`);
        if (!arr.length) {
            console.log("error1");

            return;
        }
        this.setState({ loading: true });

        window.axios
            .post(this.apiPath, params)
            .then((res) => {
                let status = res.data.status;
                if (status == 200) {
                    let files = res.data.data;
                    let oldFiles = this.state.files.join();
                    let copyFiles = this.allowMultiple
                        ? [...this.state.files, ...files]
                        : files;

                    this.setState(
                        {
                            files: copyFiles,
                            loading: false,
                            active: true,
                            toastTitle: "Upload Success",
                        },
                        () => {
                            this.props.handleValue(this.state.files.join());
                            if (!this.allowMultiple) {
                                this.props.getDeleteData(oldFiles);
                            }
                        }
                    );
                }
                if (status == 403001) {
                    this.setState({
                        loading: false,
                        active: true,
                        toastTitle: `Only less than ${this.imageSize} MB allowed`,
                    });
                }
                if (status == 403002) {
                    this.setState({
                        loading: false,
                        active: true,
                        toastTitle:
                            "You are using more space than the current plan quota, please delete the data you do not need or upgrade the plan.",
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    active: true,
                    toastTitle: "Upload Error",
                });
            });
    }

    handleModalClose() {
        this.setState({ modalOpen: false });
    }

    handleDelete(e, file, index) {
        this.deleteIndex = index;
        this.refs.ConfirmModal.handleModalOpen();
        e.stopPropagation();
    }

    handleModalDelete(item, cb) {
        const copyFiles = this.state.files.map((item) => item);
        const deleteItem = copyFiles.splice(this.deleteIndex, 1).join();

        this.props.getDeleteData(deleteItem);

        this.setState({ files: copyFiles }, () => {
            cb && cb();
            this.props.handleValue(this.state.files.join());
        });
        this.handleModalClose();
    }

    _handleGetName(file) {
        let urlArr = file.split("/");
        let urlNameStr = urlArr.pop();
        let arr = urlNameStr.split("---");
        return arr[arr.length - 1];
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.data.value != this.props.data.value &&
            this.props.data.value != ""
        ) {
            this.setState({ files: this.props.data.value.split(",") });
        }
    }

    render() {
        const { selectedName, selected, value, valueInvalid } = this.props.data;
        const {
            active,
            toastTitle,
            openFileDialog,
            files,
            modalOpen,
            loading,
        } = this.state;
        const title = (
            <div>
                <div>{selectedName} *</div>
                {selected == "file" ? (
                    <TextStyle variation="subdued">
                        Supported format-
                        ppt,pptx,xls,xlsx,doc,docx,pdf,csv,txt,zip,rar; image
                        size limit- {this.imageSize}MB
                    </TextStyle>
                ) : (
                    <>
                        {this.allowMultiple && (
                            <div>
                                <TextStyle variation="subdued">
                                    maximum number of images- {this.filesMaxNum}
                                </TextStyle>
                            </div>
                        )}
                        <TextStyle variation="subdued">
                            Supported format- png, jpg, jpeg, bmp, ico or gif;
                            image size limit- {this.imageSize}MB
                        </TextStyle>
                    </>
                )}
            </div>
        );

        return (
            <div className="spinner-rel-body">
                {loading && <Loading notFullScreen />}
                <Card sectioned title={title}>
                    <DropZone
                        type={this.type}
                        accept={this.accept}
                        openFileDialog={openFileDialog}
                        onDrop={(dropFiles, _acceptedFiles, _rejectedFiles) => {
                            this.handleDropZoneDrop(
                                dropFiles,
                                _acceptedFiles,
                                _rejectedFiles
                            );
                        }}
                        onFileDialogClose={() => {
                            this.toggleOpenFileDialog();
                        }}
                        allowMultiple={this.allowMultiple}
                    >
                        {Array.isArray(files) && files.length > 0 ? (
                            <div className="Polaris-DropZone-FileUpload box-align-left">
                                <Stack>
                                    <Stack.Item>
                                        <div
                                            className={
                                                this.isFile
                                                    ? "border-1 mr20"
                                                    : "upload-button border-1 mr20"
                                            }
                                        >
                                            <DropZone.FileUpload />
                                        </div>
                                    </Stack.Item>
                                    {files.map((file, index) => (
                                        <div key={index}>
                                            {this.isFile ? (
                                                <div className="upload-file">
                                                    <div className="upload-file-item">
                                                        <a
                                                            download
                                                            href={file}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            target="_blank"
                                                        >
                                                            <div className="upload-file-icon">
                                                                <Icon
                                                                    source={
                                                                        PackageMajor
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="upload-file-title">
                                                                {this._handleGetName(
                                                                    file
                                                                )}
                                                            </div>
                                                        </a>
                                                        <div className="upload-file-button">
                                                            <Button
                                                                outline
                                                                size="slim"
                                                                fullWidth
                                                                icon={
                                                                    DeleteMajor
                                                                }
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    this.handleDelete(
                                                                        e,
                                                                        file,
                                                                        index
                                                                    );
                                                                }}
                                                            ></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="upload-image">
                                                    <Stack.Item>
                                                        <div className="upload-image-item">
                                                            <Thumbnail
                                                                size="large"
                                                                alt={file.name}
                                                                source={
                                                                    !!file
                                                                        ? file
                                                                        : NoteMinor
                                                                }
                                                            />
                                                            <div className="mt10">
                                                                <Button
                                                                    outline
                                                                    size="slim"
                                                                    fullWidth
                                                                    icon={
                                                                        DeleteMajor
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        this.handleDelete(
                                                                            e,
                                                                            file,
                                                                            index
                                                                        );
                                                                    }}
                                                                ></Button>
                                                            </div>
                                                        </div>
                                                    </Stack.Item>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </Stack>
                            </div>
                        ) : (
                            <div className="Polaris-DropZone-FileUpload box-align-left">
                                {" "}
                                <div
                                    className={
                                        this.isFile
                                            ? "border-1"
                                            : "upload-button border-1"
                                    }
                                >
                                    <DropZone.FileUpload />
                                </div>
                            </div>
                        )}
                    </DropZone>
                </Card>
                <div className="hiddenInput">
                    <TextField
                        labelHidden
                        type="hidden"
                        value={value}
                        error={valueInvalid.isInvalid}
                    />
                    <div className="mt10">
                        <InlineError message={valueInvalid.errorMessage} />
                    </div>
                </div>
                <ConfirmModal
                    ref="ConfirmModal"
                    modalTitle="Delete this image?"
                    modalText="Are you sure you want to delete this image?"
                    onModalDelete={(item, cb) => {
                        this.handleModalDelete(item, cb);
                    }}
                />
                {active && (
                    <Toast
                        content={toastTitle}
                        onDismiss={() => this.toggleActive()}
                    />
                )}
            </div>
        );
    }
}

export default ImageType;

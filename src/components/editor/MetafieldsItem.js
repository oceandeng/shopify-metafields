import React from 'react';
import { FormLayout, TextField, InlineError, Select, TextStyle } from '@shopify/polaris';
import StringType from './types/StringType';
import IntegerType from './types/IntegerType'
import HtmlType from './types/HtmlType'
import RichTextType from './types/RichTextType'
import ImageType from './types/ImageType'
import URLType from './types/URLType'
import ColorPickerType from './types/ColorPickerType'
import DatePickerType from './types/DatePickerType'
import JsonStringType from './types/JsonStringType'
class MetafieldsItem extends React.Component {
  constructor(props) {
    super(props)

  }

  render () {
    const metafields = this.props.metafields
    const item = this.props.data
    const index = item.index

    return (
      <>
        <FormLayout>
          <FormLayout.Group condensed>
            <div>
              <TextField disabled={item.type == 'edit'} error={item.namespaceInvalid.isInvalid} label="Namespace *" value={item.namespace} onChange={(v) => { this.props.handleNameSpace(v.trim()) }} />
              <div className="mt10">
                <InlineError message={item.namespaceInvalid.errorMessage} />
              </div>
            </div>
            <div>
              <TextField disabled={item.type == 'edit'} error={item.keyInvalid.isInvalid} label="Key *" value={item.key} onChange={(v) => { this.props.handleKey(v.trim()) }} />
              <div className="mt10">
                <InlineError message={item.keyInvalid.errorMessage} />
              </div>
            </div>
            <div className="create-textarea" >
              <TextField error={item.descriptionInvalid.isInvalid} label="Description" placeholder="Description" multiline ariaActiveDescendant value={item.description} onChange={(v) => { this.props.handleDescription(v) }} />
              <div className="mt10">
                <InlineError message={item.descriptionInvalid.errorMessage} />
              </div>
            </div>
            <Select label="Type *" options={this.props.options} value={item.selected} onChange={(v) => { this.props.handleSelectChange(v, this.props.options) }}></Select>
          </FormLayout.Group>
        </FormLayout>
        <div className="pt10">
          <FormLayout>
            <div>
              {metafields[index].selected == 'string' && <StringType data={item} handleValue={(v) => { this.props.handleValue(v) }} />}
              {metafields[index].selected == 'integer' && <IntegerType data={item} handleValue={(v) => { this.props.handleValue(v) }} />}
              {metafields[index].selected == 'html' && <HtmlType data={item} handleValue={(v) => { this.props.handleValue(v) }} />}
              {metafields[index].selected == 'rich_text' &&
                <RichTextType data={item} handleValue={(v) => { this.props.handleValue(v) }} getDeleteData={(d) => { this.props.getDeleteData(d) }} />}
              {metafields[index].selected == 'image' &&
                <ImageType data={item} handleValue={(v) => { this.props.handleValue(v) }} getDeleteData={(d) => { this.props.getDeleteData(d) }} />}
              {metafields[index].selected == 'multiple_images' &&
                <ImageType data={item} handleValue={(v) => { this.props.handleValue(v) }} getDeleteData={(d) => { this.props.getDeleteData(d) }} allowMultiple />}
              {metafields[index].selected == 'file' &&
                <ImageType data={item} handleValue={(v) => { this.props.handleValue(v) }} getDeleteData={(d) => { this.props.getDeleteData(d) }} isFile/>}
              {metafields[index].selected == 'url' && <URLType data={item} handleValue={(v) => { this.props.handleValue(v) }} />}
              {metafields[index].selected == 'color_picker' && <ColorPickerType data={item} handleValue={(v) => { this.props.handleValue(v) }} />}
              {metafields[index].selected == 'date_picker' && <DatePickerType data={item} handleValue={(v) => { this.props.handleValue(v) }} />}
              {metafields[index].selected == 'json_string' && <JsonStringType data={item} handleValue={(v) => { this.props.handleValue(v) }} />}
            </div>
          </FormLayout>
        </div>
      </>
    )
  }
}

export default MetafieldsItem;
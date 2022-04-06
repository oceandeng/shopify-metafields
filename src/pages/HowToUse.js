import React from 'react'
import { Frame, Card, Heading, Button, Collapsible, Link, Modal } from '@shopify/polaris'
import step1 from '@/assets/step-1.jpg'
import step2 from '@/assets/step-2.jpg'
import step3 from '@/assets/step-3.jpg'
import step4 from '@/assets/step-4.jpg'

class HowToUse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      steps: [{
        heading: '1. Create Metafields in the resource you need ( take the product as an example ).',
        stepImg: step1,
        stepOpen: false
      }, {
        heading: '2. Copy the liquid code.',
        stepImg: step2,
        stepOpen: false
      }, {
        heading: '3. Paste the liquid code to the position you need.',
        stepImg: step3,
        stepOpen: false
      }, {
        heading: '4. Preview in the theme.',
        link: <><span className="ml20"><Link url="https://ce-300-0303.myshopify.com/products/test" external={true}>Demo</Link><span className="ml5 g9">password: 000000</span></span></>,
        stepImg: step4,
        stepOpen: false
      }],
      activeFullImage: null,
      active: false
    }
  }

  handleToogleStep (index) {
    const copys = this.state.steps.map(((item, sindex) => {
      return {
        ...item,
        stepOpen: index == sindex ? !item.stepOpen : item.stepOpen
      }
    }))
    this.setState({ steps: copys })
  }

  handleShowFullImage (img) {
    this.setState({ activeFullImage: img, active: true })
  }

  handleCloseModal () {
    this.setState({ active: false })
  }

  render () {
    const { steps, activeFullImage, active } = this.state

    return (
      <Frame>
        <div className="wrapper">
          <div className="container hwo-to-use-body">
            <Card>
              <Card.Section>
                {steps.map((item, index) => {
                  return (
                    <div key={index} className={item.stepOpen ? "step1 use-steps active" : "step1 use-steps"}>
                      <Button
                        plain monochrome
                        onClick={() => { this.handleToogleStep(index) }}
                        ariaExpanded={item.stepOpen}
                        ariaControls="basic-collapsible">
                        <Heading>{item.heading}</Heading></Button>
                      {item.link && item.link}
                      <Collapsible
                        open={item.stepOpen}
                        id="basic-collapsible"
                        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                        expandOnPrint>
                        <div className="mt20">
                          <img src={item.stepImg} onClick={() => { this.handleShowFullImage(item.stepImg) }} />
                        </div>
                      </Collapsible>
                    </div>
                  )
                })}
              </Card.Section>
            </Card>
          </div>
        </div>
        <Modal
          large
          className="how-to-use-modal"
          open={active}
          onClose={() => { this.handleCloseModal() }}
          secondaryActions={{
            content: 'Cancel',
            onAction: () => { this.handleCloseModal() }
          }}
        >
          <div className="how-to-use-img-body">
            <img src={activeFullImage} />
          </div>
        </Modal>
      </Frame>
    )
  }
}

export default HowToUse
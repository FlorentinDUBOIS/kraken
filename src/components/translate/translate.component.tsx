import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Subscription } from 'rxjs'

import { IntlService } from '../intl/intl.service'

export namespace Translate {
  export interface Props {
    name: string
  }

  export interface State {
    translation: string
  }

  export interface Context {
    intl: IntlService
  }
}

export class Translate extends React.Component<
  Translate.Props,
  Translate.State
> {
  private $subscription: Subscription

  public constructor(pProps: Translate.Props, pContext: Translate.Context) {
    super(pProps, pContext)

    const { intl }: Translate.Context = this.context

    this.state = {
      translation: intl.translation(pProps.name),
    }
  }

  public componentDidMount() {
    const { intl }: Translate.Context = this.context
    const { name } = this.props

    this.$subscription = intl.getObservableTranslation(name).subscribe({
      next: (translation: string): void => {
        this.setState({ translation })
      },
    })
  }

  public componentWillUnmount() {
    this.$subscription.unsubscribe()
  }

  public render(): JSX.Element {
    const { translation } = this.state

    return (
      <span>
        {translation}
      </span>
    )
  }

  public static get contextTypes() {
    return {
      intl: PropTypes.object.isRequired,
    }
  }
}

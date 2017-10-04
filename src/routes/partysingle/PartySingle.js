// @flow

import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Collapse } from 'react-collapse';
import Scroll from 'react-scroll';
import PartyProfile from '../../components/PartyProfile';
import s from './PartySingle.scss';

const scroll = Scroll.animateScroll;

class PartySingle extends PureComponent {
  state = {
    open: {}
  };
  toggleCategory = (category: string) => e => {
    this.setState(state => {
      const open = { ...state.open };
      open[category] = !Boolean(open[category]);
      return { open };
    });

    let curtop = 0;
    if (e.target.offsetParent) {
      do {
        curtop += e.target.offsetTop;
      } while ((e.target = e.target.offsetParent));
    }
    scroll.scrollTo(curtop - 20);
  };
  render() {
    const { open } = this.state;
    const { party, categories } = this.props;

    return (
      <div className={s.root}>
        <PartyProfile {...party} />
        <div className={s.categories}>
          {categories.map(category => (
            <div className={s.category} key={category.category}>
              <div
                className={s.info}
                onClick={this.toggleCategory(category.category)}
              >
                <h3 className={s.name}>{category.name}</h3>
              </div>
              <Collapse
                isOpened={open[category.category] === true}
                springConfig={{ stiffness: 200, damping: 20 }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      category.statement ||
                      `${party.name} hefur ekki skilað inn umfjöllun um ${category.name.toLowerCase()}.`
                  }}
                  className={cx(
                    s.text,
                    category.statement === '' ? s.textNoReply : null
                  )}
                />
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PartySingle);

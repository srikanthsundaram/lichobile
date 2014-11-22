var roundView = require('../round/view/main');
var layout = require('../layout');
var menu = require('../menu');
var overlay = require('./overlay');
var utils = require('../utils');

module.exports = function(ctrl) {
  function header() {
    var children = [
      m('nav', [
        m('a.fa.fa-navicon', { config: utils.ontouchstart(ctrl.menu.toggle) }),
        m('h1', ctrl.title()),
        m('a.fa.fa-trophy', {
          config: utils.ontouchstart(ctrl.overlay.open),
          style: { display: ctrl.overlay.isOpen ? 'none' : 'inline-block' }
        })
      ])
    ];

    if (ctrl.playing())
      children.push(roundView.renderOpponent(ctrl.round));
    else
      children.push(m('section.opponent', [m('div.infos')]));

    return children;
  }

  function board() {
    if (ctrl.playing())
      return roundView.renderBoard(ctrl.round);
    else
      return roundView.renderBoard(ctrl);
  }

  function footer() {
    if (ctrl.playing())
      return [roundView.renderPlayer(ctrl.round)];
    else
      return [m('section.player', [m('div.infos')])];
  }

  function overlayContent() {
    return [
      m('div.card.new-game', [
        m('header', 'New Game'),
        m('form', [
          m('fieldset', [
            m('div.nice-radio', [
              m('input#gameHuman.radio.human[type=radio][name=type][value=human]'),
              m('label[for=gameHuman]', 'Human')
            ]),
            m('div.nice-radio', [
              m('input#gameComputer.radio.computer[type=radio][name=type][value=computer][checked=checked]'),
              m('label[for=gameComputer]', 'Computer')
            ])
          ]),
          m('fieldset', [
            m('select[name=color]', [
              m('option[value=white]', 'White'),
              m('option[value=black]', 'Black')
            ]),
            m('select[name=variant]', [
              m('option[value=1]', 'Standard'),
              m('option[value=2]', '960'),
              m('option[value=3]', 'King of the hill')
            ])
          ]),
          m('fieldset', [
            m('input[type=checkbox][checked=checked][name=clock]', 'Clock'),
            m('select[name=time]', [
              m('option[value="5,0"]', '5|0'),
              m('option[value="1,0"]', '1|0'),
              m('option[value="10,0"]', '10|0')
            ])
          ]),
          m('button', 'Valider')
        ]),
        m('button', { config: utils.ontouchstart(ctrl.startAIGame) }, 'Start AI!'),
        m('button', { config: utils.ontouchstart(ctrl.seekHumanGame) }, 'Start Human!')
      ])
    ];
  }

  return layout(ctrl, header, board, footer, menu.view, utils.partial(overlay.view, ctrl.overlay, overlayContent));
};

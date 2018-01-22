import { findMatchingNode } from '../utils'

const actionComponent = (actionData) => {
  const $button = document.createElement('button');

  $button.classList.add('action__button');
  $button.id = actionData.id;
  $button.innerHTML = actionData.title;

  const $action = document.createElement('div');

  $action.classList.add('action')

  if (actionData.isHidden) {
    $action.classList.add('action--hidden')
  }

  $action.appendChild($button);

  return $action;
}

export const actionWrapperComponent = (actionsData) => {
  const $actions = document.createElement('div');
  const ACTIONS_REF = {};

  const toggleVisibility = (matched) => {
    const {
      hide,
      show
    } = matched;

    for (let i = 0, j = hide.length; i < j; i++) {
      ACTIONS_REF[hide[i]].classList.add('action--hidden');
    }

    for (let i = 0, j = show.length; i < j; i++) {
      ACTIONS_REF[show[i]].classList.remove('action--hidden');
    }
  }

  const triggerCallback = (e) => {
    const $found = findMatchingNode(e.target, 'button');
    let matched;

    if ($found) {
      matched = actionsData.find(action => action.id === $found.id);
    }

    if (matched) {
      matched.callback();
      toggleVisibility(matched);
    }
  }

  actionsData.forEach(actionData => {
    const $action = actionComponent(actionData)

    ACTIONS_REF[actionData.id] = $action;
    $actions.appendChild($action);
  });

  $actions.classList.add('actions');
  $actions.addEventListener('click', triggerCallback, false)

  return $actions;
}

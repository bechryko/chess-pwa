// @index('./*', (f, _) => `export { ${_.pascalCase(f.path.replace(".guard", ""))} } from '${f.path}';`)
export { CanActivateProfile } from './can-activate-profile.guard';
export { CanDeactivateGame } from './can-deactivate-game.guard';


import { FSAction, FSSubMenu } from "../classes/action";
import { CommonMenus } from "@theia/core/lib/browser";
import { TEMPLATES } from "../common/templates";
import { FSTemplate } from "../classes/template";

export const CONTEXT_MENU = ['fusion-context-menu'];
export const CONTEXT_MENU_CONNECTION = [...CONTEXT_MENU, 'a_connection'];
export const CONTEXT_MENU_NEW = [...CONTEXT_MENU, 'b_new'];
export const CONTEXT_MENU_REFRESH = [...CONTEXT_MENU, 'c_refresh'];
export const CONTEXT_MENU_NEW_SUBMENU = [...CONTEXT_MENU_NEW, 'a_from_template'];
export const CONTEXT_MENU_EDIT = [...CONTEXT_MENU, 'd_edit'];
export const CONTEXT_MENU_FILE = [...CONTEXT_MENU, 'e_file'];
export const CONTEXT_MENU_SECURITY = [...CONTEXT_MENU, 'f_security'];
export const MENU = CommonMenus.FILE_NEW;
export const actConnect: FSAction = {
  id: 'connect',
  order: 'a',
  label: 'Connect to a server',
  menu: MENU,
  menuLabel: 'New Server...',
  keys: 'ctrlcmd+shift+n',
  icon: 'fa fusion-menu-icon',
  execute: (core, prepare) => () => prepare && prepare().then(() => core.newConnection()),
};
export const actDisconnect: FSAction = {
  id: 'disconnect',
  order: 'b',
  label: 'Remove connection',
  contextMenu: CONTEXT_MENU_CONNECTION,
  icon: 'fa fa-minus',
  execute: core => () => core.deleteConnection(),
  visible: core => () => core.isConnection,
};
export const actNewCollection: FSAction = {
  id: 'new-collection',
  order: 'd',
  label: 'New collection',
  contextMenu: CONTEXT_MENU_NEW,
  icon: 'fa fa-folder-o',
  execute: core => () => core.newItem(true),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isCollection,
};
export const actNewDocument: FSAction = {
  id: 'new-document',
  order: 'a',
  label: 'Empty document',
  contextMenu: CONTEXT_MENU_NEW_SUBMENU,
  icon: 'fa fa-file-o',
  execute: core => () => core.newItem(),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isCollection,
};
export const actNewDocumentFromResult: FSAction = {
  id: 'new-document-from-result',
  order: 'b',
  label: 'From last evaluation',
  contextMenu: CONTEXT_MENU_NEW_SUBMENU,
  icon: 'fa fa-file-code-o',
  execute: core => () => core.newItemFromResult(),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isCollection && !!core.result,
};
export const actUploadDocument: FSAction = {
  id: 'upload-document',
  order: 'c2',
  label: 'Upload document(s)',
  contextMenu: CONTEXT_MENU_NEW,
  icon: 'fa fa-upload',
  execute: core => () => core.uploadItem(),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isCollection,
};
const templates: FSAction[] = TEMPLATES.map((template: FSTemplate, i: number) => ({
  id: 'new-document-template:' + template.id,
  label: template.name,
  order: 'c' + i.toString(),
  contextMenu: CONTEXT_MENU_NEW_SUBMENU,
  icon: 'fa fa-file-o',
  execute: core => () => core.newItemFromTemplate(template),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isCollection,
} as FSAction));
export const actRename: FSAction = {
  id: 'rename',
  order: 'd',
  label: 'Rename',
  contextMenu: CONTEXT_MENU_EDIT,
  keys: 'f2',
  icon: 'fa fa-i-cursor',
  execute: core => () => core.renameItem(),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isItem || core.isConnection,
};
export const actCut: FSAction = {
  id: 'cut',
  order: 'a',
  label: 'Cut',
  contextMenu: CONTEXT_MENU_EDIT,
  icon: 'fa fa-scissors',
  execute: core => () => core.cut(),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isItem,
};
export const actCopy: FSAction = {
  id: 'copy',
  order: 'd',
  label: 'Copy',
  contextMenu: CONTEXT_MENU_EDIT,
  icon: 'fa fa-files-o',
  execute: core => () => core.copy(),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isItem,
};
export const actPaste: FSAction = {
  id: 'paste',
  order: 'd',
  label: 'Paste',
  contextMenu: CONTEXT_MENU_EDIT,
  icon: 'fa fa-clipboard',
  execute: core => () => core.paste(),
  enabled: core => () => !core.isLoading && core.canPaste(),
  visible: core => () => core.isCollection,
};
export const actRefresh: FSAction = {
  id: 'refresh',
  order: 'a',
  label: 'Refresh',
  contextMenu: CONTEXT_MENU_FILE,
  icon: 'fa fa-refresh',
  execute: core => () => core.refresh(core.node as any),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isCollection,
};
export const actDelete: FSAction = {
  id: 'delete',
  order: 'b',
  label: 'Delete',
  contextMenu: CONTEXT_MENU_FILE,
  icon: 'fa fa-trash',
  execute: core => () => core.deleteItem(),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isItem,
};
export const actProperties: FSAction = {
  id: 'properties',
  order: 'c',
  label: 'Properties...',
  contextMenu: CONTEXT_MENU_FILE,
  keys: 'alt+enter',
  icon: 'fa fa-info-circle',
  execute: core => core.showPropertiesDialog.bind(core),
  visible: core => () => (core.isItem && !core.isNew) || core.isConnection,
};
export const actInfo: FSAction = {
  id: 'info',
  order: 'd',
  label: 'Server info',
  contextMenu: CONTEXT_MENU_FILE,
  icon: 'fa fa-server',
  execute: core => () => core.serverInfo(core.node as any),
  enabled: core => () => !core.isLoading,
  visible: core => () => core.isConnection,
};
export const actAddUser: FSAction = {
  id: 'add-user',
  order: 'a',
  label: 'Add user',
  contextMenu: CONTEXT_MENU_SECURITY,
  icon: 'fa fa-user-plus',
  execute: core => () => core.addUser(),
  visible: core => () => core.isUsers || core.isSecurity,
};
export const actEditUser: FSAction = {
  id: 'edit-user',
  order: 'b',
  label: 'Edit',
  contextMenu: CONTEXT_MENU_SECURITY,
  icon: 'fa fa-pencil',
  execute: core => () => core.editUser(),
  visible: core => () => core.isUser,
};
export const actDeleteUser: FSAction = {
  id: 'delete-user',
  order: 'c',
  label: 'Delete',
  contextMenu: CONTEXT_MENU_SECURITY,
  icon: 'fa fa-trash',
  execute: core => () => core.deleteUser(),
  enabled: core => () => core.canDeleteUser(),
  visible: core => () => core.isUser,
};
export const actAddGroup: FSAction = {
  id: 'add-group',
  order: 'd',
  label: 'Add group',
  contextMenu: CONTEXT_MENU_SECURITY,
  icon: 'fa fa-user-plus',
  execute: core => () => core.addGroup(),
  visible: core => () => core.isGroups || core.isSecurity,
};
export const actEditGroup: FSAction = {
  id: 'edit-group',
  order: 'e',
  label: 'Edit',
  contextMenu: CONTEXT_MENU_SECURITY,
  icon: 'fa fa-pencil',
  execute: core => () => core.editGroup(),
  visible: core => () => core.isGroup,
};
export const actDeleteGroup: FSAction = {
  id: 'delete-group',
  order: 'f',
  label: 'Delete',
  contextMenu: CONTEXT_MENU_SECURITY,
  icon: 'fa fa-trash',
  execute: core => () => core.deleteGroup(),
  enabled: core => () => core.canDeleteGroup(),
  visible: core => () => core.isGroup,
};
export const FS_COMMANDS: FSAction[] = [
  actConnect,
  actDisconnect,
  actNewCollection,
  actNewDocument,
  actNewDocumentFromResult,
  actUploadDocument,
  actCut,
  actCopy,
  actPaste,
  actRename,
  actRefresh,
  actDelete,
  actProperties,
  actInfo,
  actAddUser,
  actEditUser,
  actDeleteUser,
  actAddGroup,
  actEditGroup,
  actDeleteGroup,
  ...templates];
export const FS_SUBMENUES: FSSubMenu[] = [{
  label: 'New document...',
  menu: CONTEXT_MENU_NEW_SUBMENU,
}];
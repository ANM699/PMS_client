import Cookies from 'js-cookie';
export function getRedirectTo() {
  const projectId = Cookies.get('projectId');
  return projectId ? '/project/profile' : '/';
}

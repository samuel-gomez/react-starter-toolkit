/**
 * Fonction qui calcule le nombre de page
 * @param {number} nbItems : Nombre d'items total à paginer
 * @param {*} itemPerPage : Nombre d'items par page
 */
export function computeNumberPages(nbItems, itemPerPage = 1) {
  if (!nbItems || nbItems <= itemPerPage) {
    return 1;
  }
  const itemPerPageControlled = itemPerPage < 1 ? 1 : itemPerPage;
  return nbItems > 0 ? Math.ceil(nbItems / itemPerPageControlled) : 1;
}

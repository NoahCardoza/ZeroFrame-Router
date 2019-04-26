// Returns a string with the html for a link that will call the Router.navigate function when clicked.
// Example:
//   content += generateRouteLinkHTML('tutorials/' + tutorial.slug, tutorial.name, 'button is-info', 'margin-left: 30px;') + "<br>";
function generateRouteLinkHTML(to, display, tagClass = "", tagStyle = "") {
  var link = '<a href="./?/' + to + '" onclick="Router.navigate(\'' + to + '\'); event.preventDefault();"';

  if (tagClass && tagClass !== "") {
    link += ' class="' + tagClass + '"';
  }
  if (tagStyle && tagStyle !== "") {
    link += ' style="' + tagStyle + '"';
  }
  link += '>' + display + '</a>';
  return link;
}

module.exports = {
  generateRouteLinkHTML
}

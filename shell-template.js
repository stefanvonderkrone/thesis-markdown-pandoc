module.exports = "pandoc -N " +
        "--latex-engine=<%= latexEngine %> " +
        "<% _.forEach(header, function(h) { %>-H <%= h %> <% }); %>" +
        "<% _.forEach(variables, function(v) { %>-V <%= v %> <% }); %>" +
        "<% _.forEach(includesAfterBody, function(a) { %>-A <%= a %> <% }); %>" +
        "--chapters " + 
        "--bibliography=<%= bibliography %> " +
        "<% _.forEach(mdFiles, function(f) { %><%= f %> <% }); %>" +
        "<% if (typeof listing !== 'undefined') { %>" +
        "--listings -H <%= listing %> " +
        "<% } %>" +
        "-o <%= output %>";

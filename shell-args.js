module.exports = {
        latexEngine: "xelatex",
        header: [
            "preamble.tex"
        ],
        variables: [
            "fontsize=12pt",
            "linkcolor=black",
            "urlcolor=black",
            "documentclass:book",
            "papersize:a4paper",
            "classoption:openright"
        ],
        bibliography: "Master-Thesis.bib",
        mdFiles: [
            "markdown/title.md",
            // "markdown/summary.md",
            //"markdown/acknowledgements.md",
            "markdown/toc.md",
            "markdown/abstract.md",
            "markdown/preface.md",
            "markdown/introduction/intro1.md",
            "markdown/introduction/intro2.md",
            "markdown/chapters/chapter2_Termination.md",
            "markdown/chapters/chapter3_StarExec.md",
            "markdown/chapters/chapter4_Use_Cases.md",
            "markdown/chapters/chapter5_Requirements.md",
            "markdown/chapters/chapter6_Design.md",
            "markdown/chapters/chapter7_Implementation.md",
            "markdown/chapters/chapter8_Evaluation.md",
            "markdown/summary.md",
            "markdown/glossary.md",
            "markdown/references.md"
        ],
        listing: "listings-setup.tex",
        includesAfterBody: [
            "markdown/statement.md"
        ],
        output: "master-thesis.pdf"
    };

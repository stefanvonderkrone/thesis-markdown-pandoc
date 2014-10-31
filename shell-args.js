module.exports = {
        latexEngine: "xelatex",
        header: [
            "preamble.tex"
        ],
        variables: [
            "fontsize=12pt",
            "documentclass:book",
            "papersize:a4paper",
            "classoption:openright"
        ],
        bibliography: "Master-Thesis.bib",
        mdFiles: [
            "markdown/title.md",
            "markdown/summary.md",
            "markdown/acknowledgements.md",
            "markdown/toc.md",
            "markdown/introduction/intro1.md",
            "markdown/introduction/intro2.md",
            "markdown/chapters/chapter1_Termination_Competition.md",
            "markdown/chapters/chapter2_StarExec.md",
            "markdown/chapters/chapter3_StarExecPresenter.md",
            "markdown/chapters/chapter4_Evaluation.md",
            "markdown/appendix.md",
            "markdown/references.md"
        ],
        output: "master-thesis.pdf"
    };

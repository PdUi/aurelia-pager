import {containerless} from 'aurelia-framework';

@containerless()
export class Pager {
  constructor() {
    this.firstPage = this.convertFromDecimal(1);
  }

  pageTo(pageIndex) {
    this.currentPage = isNaN(pageIndex) ? this.convertToDecimal(pageIndex) : pageIndex;
    this.pageInput = this.convertFromDecimal(pageIndex);
    this.updateState();
  }

  pageToBeginning() {
    this.pageTo(this.convertToDecimal(this.firstPage));
  }

  retreat() {
    if (this.canPageBackward) {
      this.pageTo(this.convertToDecimal(this.currentPage) - 1);
    }
  }

  isCurrentPage(page) {
    return this.convertToDecimal(this.currentPage) === this.convertToDecimal(page);
  }

  advance() {
    if (this.currentPage < this.convertToDecimal(this.totalPages)) {
      this.pageTo(this.convertToDecimal(this.currentPage) + 1);
    }
  }

  pageToEnd() {
    this.pageTo(this.convertToDecimal(this.totalPages));
  }

  updateCurrentPage() {
    let pageInput = this.convertToDecimal(this.pageInput);

    if (pageInput && !isNaN(pageInput) && pageInput >= 1 && pageInput <= this.convertToDecimal(this.totalPages)) {
      this.isValidPageInput = true;
      this.pageTo(this.pageInput);
    } else {
      this.isValidPageInput = false;
    }
  }

  updateState() {
    let totalPages = this.convertToDecimal(this.totalPages);
    let currentPage = this.convertToDecimal(this.currentPage);
    let firstPage = this.convertToDecimal(this.firstPage);

    this.canPageBackward = currentPage > firstPage;
    this.canPageForward = currentPage < totalPages;
    
    this.hasMorePagesBackward = false;
    this.hasMorePagesForward = false;

    if (currentPage > firstPage + 2 && totalPages > this.maxExplicitPages) {
      this.hasMorePagesBackward = true;
    }

    if (currentPage < totalPages - 2 && totalPages > this.maxExplicitPages) {
      this.hasMorePagesForward = true;
    }

    let rangeStart;
    let rangeEnd;
    if (!this.hasMorePagesBackward && !this.hasMorePagesForward) {
      rangeStart = firstPage + 1;
      rangeEnd = totalPages;
    } else if (!this.hasMorePagesBackward) {
      rangeStart = firstPage + 1;
      rangeEnd = this.maxExplicitPages - 1;
    } else if (!this.hasMorePagesForward) {
      rangeEnd = totalPages;
      rangeStart = totalPages - this.maxExplicitPages + 3;
    } else {
      let hasOddNumberOfButtons = (this.maxExplicitPages % 2) === 1;
      let x = window.Math.ceil((this.maxExplicitPages - 5) / 2);

      if (currentPage + x === totalPages - 2) {
        this.hasMorePagesForward = false;
        rangeStart = currentPage - x;
        rangeEnd = totalPages;
      } else {
        if (hasOddNumberOfButtons) {
          rangeStart = currentPage - x;
          rangeEnd = currentPage + x + 1;
        } else {
          rangeStart = currentPage - x + 1;
          rangeEnd = currentPage + x + 1;
        }
      }
    }

    this.range = [];
    for (;rangeStart < rangeEnd; rangeStart++) {
      this.range.push(this.convertFromDecimal(rangeStart));
    }
  }

  bind(settingsToBind) {
    let settings = settingsToBind.pagerSettings || {};
    this.isValidPageInput = true;

    this.pageSize = this.convertToDecimal(settings.pageSize) || 10;
    this.totalNumberOfRecords = this.convertToDecimal(settings.totalNumberOfRecords) || 0;
    this.maxExplicitPages = window.Math.max((this.convertToDecimal(settings.maxExplicitPages) || 7), 5);
    let totalPages = this.totalNumberOfRecords > 0 ? window.Math.ceil(this.totalNumberOfRecords / this.pageSize) : 0;
    this.totalPages = this.convertFromDecimal(totalPages);
    let firstPage = this.convertToDecimal(this.firstPage);
    let currentPage = this.convertToDecimal(settings.currentPage) || firstPage;
    this.currentPage = this.convertFromDecimal(currentPage);
    this.enablePageInput = !this.isUndefined(settings.enablePageInput) ? settings.enablePageInput && totalPages > 1 : totalPages > 1;
    this.pageInput = this.currentPage;
    this.enablePageArrows = !this.isUndefined(settings.enablePageArrows) ? settings.enablePageArrows && totalPages > 1 : totalPages > 1;
    this.enableFirstLastPageArrows = !this.isUndefined(settings.enableFirstLastPageArrows) ? this.enablePageArrows && settings.enableFirstLastPageArrows : this.enablePageArrows; // also vm.totalPages > 2?
    // this.canPageBackward = currentPage > firstPage;
    // this.canPageForward = currentPage < totalPages;
    this.hasMultiplePages = totalPages > firstPage;
    
    this.updateState();
  }

  isUndefined(obj) {
    return obj === undefined || obj === null;
  }

  convertToDecimal(alternativeNumeralRepresentation) {
    return parseInt(alternativeNumeralRepresentation, 10);
  }

  convertFromDecimal(decimalNumeralRepresentation) {
    return decimalNumeralRepresentation;
  }
}

// ALTERNATIVE SEQUENCE GENERATORS

// ROMAN NUMERALS: http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
// function romanize (num) {
// 	if (!+num)
// 		return false;
// 	var	digits = String(+num).split(""),
// 		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
// 		       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
// 		       "","I","II","III","IV","V","VI","VII","VIII","IX"],
// 		roman = "",
// 		i = 3;
// 	while (i--)
// 		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
// 	return Array(+digits.join("") + 1).join("M") + roman;
// }

// function deromanize (str) {
// 	var	str = str.toUpperCase(),
// 		validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
// 		token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
// 		key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
// 		num = 0, m;
// 	if (!(str && validator.test(str)))
// 		return false;
// 	while (m = token.exec(str))
// 		num += key[m[0]];
// 	return num;
// }

// HEBREW: "ט".charCodeAt(0);

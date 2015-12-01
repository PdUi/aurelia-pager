import {containerless} from 'aurelia-framework';

@containerless()
export class Pager {
  pageTo(pageIndex) {
    this.settings.currentPage = pageIndex;
    this.pageInput = pageIndex;
    this.updateState();
  }

  pageToBeginning() {
    this.pageTo(1);
  }

  retreat() {
    if (this.canPageBackward) {
      this.pageTo(this.settings.currentPage - 1);
    }
  }

  advance() {
    if (this.settings.currentPage < this.totalPages) {
      this.pageTo(this.settings.currentPage + 1);
    }
  }

  pageToEnd() {
    this.pageTo(this.totalPages);
  }

  updateCurrentPage() {
    if (this.pageInput && !isNaN(this.pageInput) && this.pageInput >= 1 && this.pageInput <= this.totalPages) {
      this.isValidPageInput = true;
      this.pageTo(this.pageInput);
    } else {
      this.isValidPageInput = false;
    }
  }

  updateState() {
    const firstPage = 1;

    this.hasMorePagesBackward = false;
    this.hasMorePagesForward = false;

    if (this.settings.currentPage > firstPage + 2 && this.totalPages > this.maxExplicitPages) {
      this.hasMorePagesBackward = true;
    }

    if (this.settings.currentPage < this.totalPages - 2 && this.totalPages > this.maxExplicitPages) {
      this.hasMorePagesForward = true;
    }

    let rangeStart;
    let rangeEnd;
    if (!this.hasMorePagesBackward && !this.hasMorePagesForward) {
      rangeStart = firstPage + 1;
      rangeEnd = this.totalPages;
    } else if (!this.hasMorePagesBackward) {
      rangeStart = firstPage + 1;
      rangeEnd = this.maxExplicitPages - 1;
    } else if (!this.hasMorePagesForward) {
      rangeEnd = this.totalPages;
      rangeStart = this.totalPages - this.maxExplicitPages + 3;
    } else {
      let hasOddNumberOfButtons = (this.maxExplicitPages % 2) === 1;
      let x = window.Math.ceil((this.maxExplicitPages - 5) / 2);

      if (this.settings.currentPage + x === this.totalPages - 2) {
        this.hasMorePagesForward = false;
        rangeStart = this.settings.currentPage - x;
        rangeEnd = this.totalPages;
      } else {
        if (hasOddNumberOfButtons) {
          rangeStart = this.settings.currentPage - x;
          rangeEnd = this.settings.currentPage + x + 1;
        } else {
          rangeStart = this.settings.currentPage - x + 1;
          rangeEnd = this.settings.currentPage + x + 1;
        }
      }
    }

    this.range = [];
    for (;rangeStart < rangeEnd; rangeStart++) {
      this.range.push(rangeStart);
    }
  }

  bind(settings) {
    this.settings = settings || {};
    this.isValidPageInput = true;

    this.pageSize = parseInt(this.settings.pageSize, 10) || 10;
    this.totalNumberOfRecords = parseInt(this.settings.totalNumberOfRecords, 10) || 100;
    this.maxExplicitPages = window.Math.max((parseInt(this.settings.maxExplicitPages, 10) || 7), 5);
    this.totalPages = this.totalNumberOfRecords > 0 ? window.Math.ceil(this.totalNumberOfRecords / this.pageSize) : 0;
    this.currentPage = parseInt(this.settings.currentPage, 10) || 1;
    this.enablePageInput = !this.isUndefined(this.settings.enablePageInput) ? this.settings.enablePageInput && this.totalPages > 1 : this.totalPages > 1;
    this.pageInput = this.currentPage;
    this.enablePageArrows = !this.isUndefined(this.settings.enablePageArrows) ? this.settings.enablePageArrows && this.totalPages > 1 : this.totalPages > 1;
    this.enableFirstLastPageArrows = !this.isUndefined(this.settings.enableFirstLastPageArrows) ? this.enablePageArrows && this.settings.enableFirstLastPageArrows : this.enablePageArrows; // also vm.totalPages > 2?
    this.canPageBackward = this.currentPage > 1;
    this.canPageForward = this.currentPage < this.totalPages;

    this.updateState();
  }

  isUndefined(obj) {
    return obj === undefined || obj === null;
  }
}

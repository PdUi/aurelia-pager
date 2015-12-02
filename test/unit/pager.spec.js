import {Pager} from '../../src/components/pager/pager';

describe('the Pager module', () => {

  it('pager not given any settings has correct default values applied', (done) => {
    var pager = new Pager();
    pager.bind();

    expect(pager.isValidPageInput).toBe(true);
    expect(pager.pageSize).toBe(10);
    expect(pager.totalNumberOfRecords).toBe(0);
    expect(pager.maxExplicitPages).toBe(7);
    expect(pager.totalPages).toBe(0);
    expect(pager.currentPage).toBe(1);
    expect(pager.enablePageInput).toBe(false);
    expect(pager.pageInput).toBe(1);
    expect(pager.enablePageArrows).toBe(false);
    expect(pager.enableFirstLastPageArrows).toBe(false);
    expect(pager.canPageBackward).toBe(false);
    expect(pager.canPageForward).toBe(false);
    expect(pager.range.length).toBe(0);

    done();
  });

  it('pager given settings has correct settings applied', (done) => {
    var pagerSettings = {
      pageSize: 25,
      totalNumberOfRecords: 500,
      maxExplicitPages: 10,
      currentPage: 2,
      enablePageInput: false,
      enablePageArrows: false,
      enableFirstLastPageArrows: false
    };

    var pager = new Pager();
    pager.bind(pagerSettings);

    expect(pager.isValidPageInput).toBe(true);
    expect(pager.pageSize).toBe(25);
    expect(pager.totalNumberOfRecords).toBe(500);
    expect(pager.maxExplicitPages).toBe(10);
    expect(pager.totalPages).toBe(20);
    expect(pager.currentPage).toBe(2);
    expect(pager.enablePageInput).toBe(false);
    expect(pager.pageInput).toBe(2);
    expect(pager.enablePageArrows).toBe(false);
    expect(pager.enableFirstLastPageArrows).toBe(false);
    expect(pager.canPageBackward).toBe(true);
    expect(pager.canPageForward).toBe(true);
    expect(pager.range.length).toBe(7);
    expect(pager.range[0]).toBe(2);
    expect(pager.range[pager.range.length - 1]).toBe(8);

    done();
  });
  
  it('pager given settings has correct settings/default values applied', (done) => {
    var pagerSettings = {
      pageSize: 25,
      totalNumberOfRecords: 250
    };

    var pager = new Pager();
    pager.bind(pagerSettings);

    expect(pager.isValidPageInput).toBe(true);
    expect(pager.pageSize).toBe(25);
    expect(pager.totalNumberOfRecords).toBe(250);
    expect(pager.maxExplicitPages).toBe(7);
    expect(pager.totalPages).toBe(10);
    expect(pager.currentPage).toBe(1);
    expect(pager.enablePageInput).toBe(true);
    expect(pager.pageInput).toBe(1);
    expect(pager.enablePageArrows).toBe(true);
    expect(pager.enableFirstLastPageArrows).toBe(true);
    expect(pager.canPageBackward).toBe(false);
    expect(pager.canPageForward).toBe(true);
    expect(pager.range.length).toBe(4);

    done();
  });
});

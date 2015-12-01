import {Pager} from '../../src/components/pager/pager';

describe('the Pager module', () => {

  it('pager not given any settings has correct default values applied', (done) => {
    var pager = new Pager();
    pager.bind();

    expect(pager.isValidPageInput).toBe(true);
    expect(pager.pageSize).toBe(10);
    expect(pager.totalNumberOfRecords).toBe(100);
    expect(pager.maxExplicitPages).toBe(7);
    expect(pager.totalPages).toBe(10);
    expect(pager.currentPage).toBe(1);
    expect(pager.enablePageInput).toBe(true);
    expect(pager.pageInput).toBe(1);
    expect(pager.enablePageArrows).toBe(true);
    expect(pager.enableFirstLastPageArrows).toBe(true);
    expect(pager.canPageBackward).toBe(false);
    expect(pager.canPageForward).toBe(true);

    done();
  });
});
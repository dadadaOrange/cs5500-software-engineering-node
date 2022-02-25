/**
 * @file Implements DAO managing data storage of messages. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao == null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Uses BookmarkModel to retrieve all tuits documents that user bookmarked tuits from bookmarks collection by user id
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Inserts bookmarks instance into the database
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (tid: string, uid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Removes bookmarks from the database.
     * @param {string} tid Primary key of tuit to be unbookmarked
     * @param {string} uid Primary key of user to be unbookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarkModel.deleteMany({bookmarkedTuit: tid, bookmarkedBy: uid});
}

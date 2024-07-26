package fr.thomas.eq_04_00_sae_mobile.dao

interface Dao<T> {
    fun findAll(): ArrayList<T>
    fun findById(id: String): T?
}
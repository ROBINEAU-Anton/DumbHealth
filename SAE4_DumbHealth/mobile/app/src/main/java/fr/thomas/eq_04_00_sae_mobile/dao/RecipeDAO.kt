package fr.thomas.eq_04_00_sae_mobile.dao

import android.util.Log
import fr.thomas.eq_04_00_sae_mobile.models.ComplexSearchResult
import fr.thomas.eq_04_00_sae_mobile.models.Recipe
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.plugins.observer.ResponseObserver
import io.ktor.client.request.get
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class RecipeDAO {
    companion object : Dao<Recipe> {
        private const val API_KEY = "705e5d6b755a4a0babcbca18d7ecab4c"
        private val json = Json {ignoreUnknownKeys = true}

        private val kTorClient = HttpClient(OkHttp) {
            install(HttpTimeout) {
                requestTimeoutMillis = 15000L
                connectTimeoutMillis = 15000L
                socketTimeoutMillis = 15000L
            }
            install(Logging) { /* debug mode */
                logger = object : Logger {
                    override fun log(message: String) {
                        Log.v("Logger Ktor", message)
                    }
                }
                level = LogLevel.ALL
            }
            install(ResponseObserver) { /* debug mode */
                onResponse { response ->
                    Log.d("HTTP status:", "${response.status.value}")
                }
            }
            install(ContentNegotiation) {
                json( Json {
                    prettyPrint = true
                })
            }
        }

        private fun getRequestResult(url : String) : String {
            lateinit var result : String
            runBlocking(Dispatchers.IO) {
                val response = kTorClient.get(url)
                result = response.body<String>()
            }
            return result
        }

        override fun findAll(): ArrayList<Recipe> {
            val response: String
            return try {
                response = getRequestResult("https://api.spoonacular.com/recipes/complexSearch?apiKey=$API_KEY")
                json.decodeFromString<ComplexSearchResult>(response).results
            } catch(e: Exception) {
                arrayListOf()
            }
        }

        override fun findById(id: String): Recipe? = json.decodeFromString<Recipe?>(getRequestResult("https://api.spoonacular.com/recipes/$id/information?apiKey=$API_KEY"))
    }
}